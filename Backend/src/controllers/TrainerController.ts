import { NextFunction, Request, Response } from "express";
import { BaseResponse, GridResponse, PaginatedRequest, TrainerRequestBody } from "../types";
import { Trainer, Company, User, Training, Field } from "../models";
import UserController from "./UserController";
import { TrainerStatusEnum, TrainingStatusEnum, UserRoleEnum } from "../enums";
import { Op } from "sequelize";
import { DEFAULT_PAGE_SIZE } from "../constants";
const { addUser, generateAccount } = UserController;
class TrainierController {
  addtrainer = async (
    req: TrainerRequestBody,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    try {
      const { id, name, email, fieldId } = req.body;
      const userId = req.user.userId;
      const company = await Company.findOne({
        where: { userId },
        attributes: ["id"],
      });
      const companyId = company?.id;

      const trainer = await Trainer.findByPk(id);

      if (trainer) {
        if (trainer.companyId == companyId) {
          if (trainer.status == TrainerStatusEnum.active)
            return res.json({
              success: false,
              status: res.statusCode,
              message: "trainer already exists",
              data: trainer,
            });
          else
            await Trainer.update(
              { status: TrainerStatusEnum.active },
              {
                where: { id: trainer?.id },
              }
            );
        }
        if (trainer.companyId != companyId) {
          if (trainer.status == TrainerStatusEnum.inactive)
            await Trainer.update(
              { status: TrainerStatusEnum.active, companyId: companyId },
              {
                where: { id: trainer?.id },
              }
            );
          else
            return res.json({
              success: false,
              status: res.statusCode,
              message: "trainer already exists and active in other company",
              data: trainer,
            });
        }

        const trainerRecord = await Trainer.findByPk(id);
        return res.json({
          success: true,
          status: res.statusCode,
          message: "trainer added successfully",
          data: trainerRecord,
        });
      }

      const fieldRecord = await Field.findByPk(fieldId);
      const field = fieldRecord?.field;
      const { temp, password } = await generateAccount(name, field!);

      const user = await addUser({
        username: temp,
        email,
        password,
        saltRounds: 10,
        roleId: UserRoleEnum.TRAINER,
        name,
      });

      const TrainerRecord = await Trainer.create({
        id,
        name,
        fieldId,
        status: TrainerStatusEnum.active,
        userId: user,
        companyId,
      });

      if (!TrainerRecord) {
        return res.json({
          success: false,
          status: res.statusCode,
          message: "error creating trainer account",
        });
      }

      return res.json({
        success: true,
        status: res.statusCode,
        message: "success adding trainer",
        data: TrainerRecord,
      });
    } catch (err) {
      next(err);
    }
  };

  getCompanyTrainers = async (
    req: PaginatedRequest,
    res: Response<GridResponse>,
    next: NextFunction
  ) => {
    try {
      const page = +req.query?.page || 0;
      const size = +req.query?.size || DEFAULT_PAGE_SIZE;
      const userId = req.user.userId;
      const company = await Company.findOne({
        where: { userId },
        attributes: ["id"],
      });
      const companyId = company?.id;
      let options = {
        where: {
          [Op.and]: {
            companyId,
            status: TrainerStatusEnum.active,
          },
        }
      }
      const records = await Trainer.findAll({
        ...options,
        include: { model: Field },
        limit: size,
        offset: page * size,
      });

      const totalItems = await Trainer.count(options);
      return res.json({
        items: records,
        pageNumber: page,
        pageSize: size,
        totalItems,
        totalPages: Math.ceil(totalItems / size)
      });

    } catch (err) {
      next(err);
    }
  };

  updateTrainer = async (
    req: Request<unknown, unknown, { id: number; fieldId: number }>,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    const { id, fieldId } = req.body;
    try {
      console.log(fieldId);
      await Trainer.update(
        { fieldId },
        {
          where: { id },
        }
      );
      const trainerRecord = await Trainer.findByPk(id, {
        include: { model: Field },
      });
      if (trainerRecord)
        return res.json({
          success: true,
          status: res.statusCode,
          message: "successfully updated trainers field",
          data: trainerRecord,
        });

      return res.json({
        success: false,
        status: res.statusCode,
        message: "something went wrong",
      });
    } catch (err) {
      next(err);
    }
  };

  deactivateTrainer = async (
    req: Request<unknown, unknown, { id: number }>,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    try {
      const { id } = req.body;
      const trainingRecords = await Training.findAll({
        where: {
          [Op.and]: {
            trainerId: id,
            status: TrainingStatusEnum.running,
          },
        },
      });
      if (trainingRecords.length > 0)
        return res.json({
          success: false,
          status: res.statusCode,
          message: "Trainer linked with trainees, can't be deactivated",
          data: trainingRecords,
        });
      await Trainer.update(
        { status: TrainerStatusEnum.inactive },
        {
          where: { id },
        }
      );
      const trainerRecord = await Trainer.findByPk(+id);
      if (trainerRecord)
        return res.json({
          success: true,
          status: res.statusCode,
          message: "successfully disabled trainer",
          data: trainerRecord,
        });
      return res.json({
        success: false,
        status: res.statusCode,
        message: "something went wrong",
      });
    } catch (err) {
      next(err);
    }
  };
}

export default new TrainierController();