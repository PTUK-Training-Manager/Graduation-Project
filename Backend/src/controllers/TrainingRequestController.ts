import { NextFunction, Request, Response } from 'express';
import { CompanyBranch, Student, Training, Company, User } from "../models";
import { TrainingStatusEnum, TrainingTypeEnum } from "../enums"
import { Op } from 'sequelize';
import { BaseResponse } from '../types';
import { getBranchesIds } from '../utils';

class TrainingRequestController {

    submitRequest = async (req: Request, res: Response<BaseResponse>, next: NextFunction) => {
        try {
            const { studentId, type, semester, companyBranchId } = req.body;
            //to check that student has only one training for a type
            let record = await Training.findOne({
                where: {
                    studentId: studentId,
                    type: type,
                    status: {
                        [Op.notIn]: [TrainingStatusEnum.rejected, TrainingStatusEnum.canceled]
                    }
                }
            });

            if (record) {
                return res.json({
                    success: false,
                    status: res.statusCode,
                    message: `student ${studentId} has ${record.status} traing `,
                    data: record
                });
            }

            // to check that student finished first Training
            if (type === TrainingTypeEnum.second) {
                record = await Training.findOne({
                    where: {
                        studentId: studentId,
                        [Op.or]: [
                            { status: TrainingStatusEnum.submitted },
                            { status: TrainingStatusEnum.completed }
                        ],
                        type: TrainingTypeEnum.first
                    }
                });
                if (!record) {
                    return res.json({
                        success: false,
                        status: res.statusCode,
                        message: `student ${studentId}  sholud finished first Training  `
                    });
                }
            }
            if (type === TrainingTypeEnum.compound) {
                record = await Training.findOne({
                    where: {
                        studentId: studentId,
                        [Op.or]: [
                            { type: TrainingTypeEnum.first },
                            { type: TrainingTypeEnum.second }
                        ],
                        status: {
                            [Op.notIn]: [TrainingStatusEnum.rejected, TrainingStatusEnum.canceled]
                        }
                    }
                });
                if (record) {
                    return res.json({
                        success: false,
                        status: res.statusCode,
                        message: `student ${studentId} has ${record.type} traing `,
                        data: record
                    });
                }
            }

            const student = await Student.findOne({
                where: { id: studentId }
            });
            if (!student) {
                return res.json({
                    success: false,
                    status: res.statusCode,
                    message: `student ${studentId} not found `
                });
            }
            const request = await Training.create({
                type: type,
                semester: semester,
                status: TrainingStatusEnum.pending,
                studentId: studentId,
                companyBranchId: companyBranchId
            });

            return res.json({
                success: true,
                status: res.statusCode,
                message: "Successfully SUBMITTED RREQUEST",
                data: request
            });
        } catch (err) {
            next(err);
        }
    }

    getPendingRequest = async (req: Request, res: Response<BaseResponse>, next: NextFunction) => {
        try {
            const trainingRequestsRecords = await Training.findAll({
                attributes: ['id', 'studentId', 'companyBranchId'],
                where: {
                    status: TrainingStatusEnum.pending
                },
                include: [
                    {
                        model: Student,
                        attributes: ['name']
                    },
                    {
                        model: CompanyBranch,
                        attributes: ['location'],
                        include: [
                            {
                                model: Company,
                                attributes: ['name']
                            }
                        ]
                    }
                ]
            });
            return res.json({
                success: true,
                status: res.statusCode,
                message: "pending request",
                data: trainingRequestsRecords
            });
        } catch (err) {
            next(err);
        }
    }

    deleteRequest = async (req: Request, res: Response<BaseResponse>, next: NextFunction) => {
        try {
            let { id } = req.params;
            const deletedRequest = await Training.destroy({
                where: { id }
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
                data: deletedRequest
            });
        } catch (err) {
            next(err)
        }

    }

    getTrainingRequest = async (req: Request, res: Response<BaseResponse>, next: NextFunction) => {
        try {

            const branchesId = await getBranchesIds(req.user.userId);
            const trainingRequests = await Training.findAll({
                where: {
                    status: TrainingStatusEnum.pending,
                    companyBranchId: { [Op.in]: branchesId }
                },
                attributes: ['id', 'type', 'studentId', 'companyBranchId'],
                include: [
                    {
                        model: Student,
                        attributes: ['name']
                    },
                    {
                        model: CompanyBranch,
                        attributes: ['location']
                    }]
            });
            return res.json({
                success: true,
                status: res.statusCode,
                message: `training requests: `,
                data: trainingRequests
            });

        }
        catch (err) {
            next(err);
        }
    }

}

export default new TrainingRequestController();
