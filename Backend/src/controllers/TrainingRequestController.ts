import { NextFunction, Request, Response } from "express";
import { CompanyBranch, Student, Training, Company, User } from "../models";
import { TrainingStatusEnum, TrainingTypeEnum } from "../enums";
import { Op } from "sequelize";
import { BaseResponse, GridResponse, PaginatedRequest } from "../types";
import { getBranchesIds } from "../utils";
import { DEFAULT_PAGE_SIZE } from "../constants";

class TrainingRequestController {
  submitRequest = async (
    req: Request,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    try {
      const { studentId, type, semester, companyBranchId } = req.body;
      //to check that student has only one training for a type
      let record = await Training.findOne({
        where: {
          studentId: studentId,
          type: type,
          status: {
            [Op.notIn]: [
              TrainingStatusEnum.rejected,
              TrainingStatusEnum.canceled,
            ],
          },
        },
      });

      if (record) {
        return res.json({
          success: false,
          status: res.statusCode,
          message: `student ${studentId} has ${record.status} training `,
          data: record,
        });
      }

      // to check that student finished first Training
      if (type === TrainingTypeEnum.second) {
        record = await Training.findOne({
          where: {
            studentId: studentId,
            [Op.or]: [
              { status: TrainingStatusEnum.submitted },
              { status: TrainingStatusEnum.completed },
            ],
            type: TrainingTypeEnum.first,
          },
        });
        if (!record) {
          return res.json({
            success: false,
            status: res.statusCode,
            message: `student ${studentId}  sholud finished first Training  `,
          });
        }
      }
      if (type === TrainingTypeEnum.compound) {
        record = await Training.findOne({
          where: {
            studentId: studentId,
            [Op.or]: [
              { type: TrainingTypeEnum.first },
              { type: TrainingTypeEnum.second },
            ],
            status: {
              [Op.notIn]: [
                TrainingStatusEnum.rejected,
                TrainingStatusEnum.canceled,
              ],
            },
          },
        });
        if (record) {
          return res.json({
            success: false,
            status: res.statusCode,
            message: `student ${studentId} has ${record.type} training `,
            data: record,
          });
        }
      }

      const student = await Student.findOne({
        where: { id: studentId },
      });
      if (!student) {
        return res.json({
          success: false,
          status: res.statusCode,
          message: `student ${studentId} not found `,
        });
      }
      const request = await Training.create({
        type: type,
        semester: semester,
        status: TrainingStatusEnum.pending,
        studentId: studentId,
        companyBranchId: companyBranchId,
      });

      return res.json({
        success: true,
        status: res.statusCode,
        message: "Successfully SUBMITTED RREQUEST",
        data: request,
      });
    } catch (err) {
      next(err);
    }
  };

  getPendingRequest = async (
    req: PaginatedRequest,
    res: Response<GridResponse>,
    next: NextFunction
  ) => {
    try {
      const page = +req.query?.page || 0;
      const size = +req.query?.size || DEFAULT_PAGE_SIZE;
      let options = {
        where: {
          status: TrainingStatusEnum.pending,
        }
      }
      const trainingRequestsRecords = await Training.findAll({
        ...options,
        attributes: ["id", "studentId", "companyBranchId"],
        include: [
          {
            model: Student,
            attributes: ["name"],
          },
          {
            model: CompanyBranch,
            attributes: ["location"],
            include: [
              {
                model: Company,
                attributes: ["name"],
              },
            ],
          },
        ],
        limit: size,
        offset: page * size
      });
      const totalItems = await Training.count(options);
      return res.json({
        items: trainingRequestsRecords,
        pageNumber: page,
        pageSize: size,
        totalItems,
        totalPages: Math.ceil(totalItems / size)
      })

    } catch (err) {
      next(err);
    }
  };

  deleteRequest = async (
    req: Request,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    try {
      let { id } = req.params;
      const deletedRequest = await Training.destroy({
        where: { id },
      });
      if (!deletedRequest)
        return res.json({
          success: false,
          status: res.statusCode,
          message: "something went wrong ",
        });

      return res.json({
        success: true,
        status: res.statusCode,
        message: `training deleted successfully`,
        data: deletedRequest,
      });
    } catch (err) {
      next(err);
    }
  };

  getTrainingRequest = async (
    req: PaginatedRequest,
    res: Response<GridResponse>,
    next: NextFunction
  ) => {
    try {
      const page = +req.query?.page || 0;
      const size = +req.query?.size || DEFAULT_PAGE_SIZE;
      const branchesId = await getBranchesIds(req.user.userId);
      let options = {
        where: {
          status: TrainingStatusEnum.pending,
          companyBranchId: { [Op.in]: branchesId },
        }
      }
      const trainingRequests = await Training.findAll({
        ...options,
        attributes: ["id", "type", "studentId", "companyBranchId"],
        include: [
          {
            model: Student,
            attributes: ["name"],
          },
          {
            model: CompanyBranch,
            attributes: ["location"],
          },
        ],
        limit: size,
        offset: page * size,
      });

      const totalItems = await Training.count(options);
      return res.json({
        items: trainingRequests,
        pageNumber: page,
        pageSize: size,
        totalItems,
        totalPages: Math.ceil(totalItems / size)
      })

    } catch (err) {
      next(err);
    }
  };
}

export default new TrainingRequestController();