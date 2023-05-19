import { NextFunction, Request, Response } from "express";
import {
  Student,
  AnsweredQuestion,
  Answer,
  Company,
  Evaluation,
  Note,
  Question,
  Trainer,
  Training,
  CompanyBranch,
  User,
} from "../models/index";
import { fn, col, Op, literal, Sequelize } from "sequelize";
import {
  TrainingStatusEnum,
  UserRoleEnum,
  TrainingTypeEnum,
  EvaluationStatusEnum,
} from "../enums";
import {
  ButtonHandler,
  BaseResponse,
  TrainingRequestBody,
  SubmitBody,
  EditTrainerRequestBody,
  ChangeTrainingStatusBody
} from "../types";
import { getBranchesIds, getStudentId, getTrainingIds } from "../utils";
import EvaluationController from "./EvaluationController";

class TrainingController {
  getCompletedTrainings = async (
    req: Request,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    try {
      const roleId = req.user.roleId;
      let completedTrainings: Training[] = [];
      if (UserRoleEnum.UNI_TRAINING_OFFICER == roleId) {
        completedTrainings = await Training.findAll({
          attributes: ["studentId", [fn("COUNT", col("studentId")), "count"]],
          where: {
            status: TrainingStatusEnum.completed,
          },
          include: [
            {
              model: Student,
              attributes: ["name"],
            },
          ],
          group: ["studentId"],
        });
      } else if (UserRoleEnum.Company == roleId) {
        const branchesId = await getBranchesIds(req.user.userId);
        completedTrainings = await Training.findAll({
          where: {
            status: TrainingStatusEnum.completed,
            companyBranchId: { [Op.in]: branchesId },
          },
          attributes: ["id", "studentId", "companyBranchId", "trainerId"],
          include: [
            {
              model: Student,
              attributes: ["name"],
            },
            {
              model: CompanyBranch,
              attributes: ["location"],
            },
            {
              model: Trainer,
              attributes: ["name"],
            },
          ],
        });
      } else if (roleId == UserRoleEnum.TRAINER) {
        const trainingIds = await getTrainingIds(req.user.userId);
        completedTrainings = await Training.findAll({
          where: {
            status: TrainingStatusEnum.completed,
            id: { [Op.in]: trainingIds },
          },
          attributes: ["id", "studentId"],
          include: [
            {
              model: Student,
              attributes: ["name"],
            },
          ],
        });
      }
      return res.json({
        success: true,
        status: res.statusCode,
        message: "Completed Trainings",
        data: completedTrainings,
      });
    } catch (err) {
      next(err);
    }
  };

  handleGenerateFormButton = async (
    req: ButtonHandler,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    try {
      const studentId = req.body.studentId;
      const trainings = await Training.findAll({
        where: {
          studentId,
          status: TrainingStatusEnum.completed,
        },
        attributes: ["id"],
      });
      const index = req.body.index;
      req.body.trainingId = trainings[index].id;
      console.log(trainings[index].id);
      await this.generateEvaluationForm(req, res, next);
    } catch (err) {
      next(err);
    }
  };

  generateEvaluationForm = async (
    req: ButtonHandler,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    try {
      const trainingId = req.body.trainingId;
      const evaluationForm = await Training.findAll({
        where: { id: trainingId },
        include: [
          {
            model: Student,
          },
          {
            model: Evaluation,
            where: { status: EvaluationStatusEnum.signed },
          },
          {
            model: AnsweredQuestion,
            include: [
              {
                model: Question,
                attributes: ["question"],
              },
              {
                model: Note,
                attributes: ["note"],
              },
              {
                model: Answer,
                attributes: ["answer"],
              },
            ],
            attributes: ["id"],
          },
          {
            model: CompanyBranch,
            include: [
              {
                model: Company,
                include: [
                  {
                    model: User,
                    attributes: ["email"],
                  },
                ],
              },
            ],
            attributes: ["location"],
          },
          { model: Trainer, attributes: ["name"] },
        ],
      });

      return res.json({
        success: true,
        status: res.statusCode,
        message: "Evaluation Form",
        data: evaluationForm,
      });
    } catch (err) {
      next(err);
    }
  };

  getRunningAndFinishedStudents = async (
    req: Request,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    try {
      const userId = req.user.userId;
      const trainer = await Trainer.findOne({
        where: { userId },
      });

      const record = await Training.findAll({
        where: {
          status: TrainingStatusEnum.running,
          trainerId: trainer?.id,
        },
        include: [
          {
            model: Student,
            attributes: ["name"],
          },
        ],
      });

      let students: Training[] = [];

      const totalDuration = await Promise.all(
        record.map(async (student) => {
          const calcHours = await EvaluationController.calcHours(student.id);
          let hours = 200;
          if (student.type === TrainingTypeEnum.compound) {
            hours = 400;
          }

          if (calcHours > 30) {
            students.push(student);
          }
        })
      );

      return res.json({
        success: true,
        status: res.statusCode,
        message: "Students: ",
        data: students,
      });
    } catch (err) {
      next(err);
    }
  };

  getsubmittedStudents = async (
    req: Request,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    try {
      const userId = req.user.userId;
      const trainer = await Trainer.findOne({
        where: { userId },
      });
      const record = await Training.findAll({
        where: {
          status: TrainingStatusEnum.submitted,
          trainerId: trainer?.id,
        },
        include: [
          {
            model: Student,
            attributes: ["name"],
          },
        ],
      });
      return res.json({
        success: true,
        status: res.statusCode,
        message: "Submitted Students: ",
        data: record,
      });
    } catch (err) {
      next(err);
    }
  };

  getQuestions=async (
    req: TrainingRequestBody,
    res: Response<BaseResponse>,
    next: NextFunction
  )=> {
    try {
      const roleId = req.user.roleId;
      const record = await Question.findAll({
        where: {
          roleId,
        },
      });
      return res.json({
        success: true,
        status: res.statusCode,
        message: "Qustions: ",
        data: record,
      });
    } catch (err) {
      next(err);
    }
  }

  submitQuestions = async (
    req: SubmitBody,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    try {
      const { trainingId, arrayData } = req.body;

      const promises: Promise<AnsweredQuestion | Note>[] = [];

      for (let i = 0; i < arrayData.length; i++) {
        let currentData = arrayData[i];

        if (currentData.note) {
          //خزن النوت ف جدول النوت
          const noteRecord = await Note.create({
            note: currentData.note,
          });

          const answeredQuestionPromise = AnsweredQuestion.create({
            trainingId,
            questionId: currentData.questionId,
            answerId: currentData.answerId,
            noteId: noteRecord.id,
          });
          promises.push(answeredQuestionPromise);
        } else {
          const answeredQuestionPromise = AnsweredQuestion.create({
            trainingId,
            questionId: currentData.questionId,
            answerId: currentData.answerId,
          });
          promises.push(answeredQuestionPromise);
        }
      }

      await Promise.all(promises);

      const roleId = req.user.roleId;
      let status = null;
      if (roleId === UserRoleEnum.UNI_TRAINING_OFFICER) {
        await Training.update(
          { status: TrainingStatusEnum.completed, endDate: fn("CURDATE") },
          {
            where: {
              id: trainingId,
            },
          }
        );
        status = TrainingStatusEnum.completed;
      } else if (roleId === UserRoleEnum.TRAINER) {
        await Training.update(
          { status: TrainingStatusEnum.submitted, endDate: fn("CURDATE") },
          {
            where: {
              id: trainingId,
            },
          }
        );
        status = TrainingStatusEnum.submitted;
      }
      const record = await Training.findOne({
        where: { id: trainingId },
      });

      return res.json({
        success: true,
        status: res.statusCode,
        message: `The Training was successfully updated to ${status}`,
        data: record,
      });
    } catch (err) {
      next(err);
    }
  };

  getAcceptedTrainings = async (
    req: Request,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    try {
      const branchesId = await getBranchesIds(req.user.userId);
      const acceptedTrainings = await Training.findAll({
        where: {
          status: TrainingStatusEnum.accepted,
          companyBranchId: { [Op.in]: branchesId },
        },
        attributes: ["id", "studentId", "companyBranchId"],
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
      });
      return res.json({
        success: true,
        status: res.statusCode,
        message: `acceptedRequests: `,
        data: acceptedTrainings,
      });
    } catch (err) {}
  };

  getRunningTrainings = async (
    req: Request,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    try {
      const roleId = req.user.roleId;
      let runningTrainings: Training[] = [];
      if (roleId == UserRoleEnum.Company) {
        const branchesId = await getBranchesIds(req.user.userId);
        runningTrainings = await Training.findAll({
          where: {
            status: TrainingStatusEnum.running,
            companyBranchId: { [Op.in]: branchesId },
          },
          attributes: ["id", "studentId", "companyBranchId", "trainerId"],
          include: [
            {
              model: Student,
              attributes: ["name"],
            },
            {
              model: CompanyBranch,
              attributes: ["location"],
            },
            {
              model: Trainer,
              attributes: ["name"],
            },
          ],
        });
      } else if (roleId == UserRoleEnum.UNI_TRAINING_OFFICER) {
        runningTrainings = await Training.findAll({
          where: {
            status: TrainingStatusEnum.running,
          },
          attributes: ["id", "studentId", "companyBranchId"],
          include: [
            {
              model: Student,
              attributes: ["name"],
            },
            {
              model: CompanyBranch,
              include: [
                {
                  model: Company,
                  attributes: ["name"],
                },
              ],
              attributes: ["location"],
            },
          ],
        });
      } else if (roleId == UserRoleEnum.TRAINER) {
        const trainingIds = await getTrainingIds(req.user.userId);
        runningTrainings = await Training.findAll({
          where: {
            status: TrainingStatusEnum.running,
            id: { [Op.in]: trainingIds },
          },
          attributes: ["id", "studentId"],
          include: [
            {
              model: Student,
              attributes: ["name"],
            },
          ],
        });
      }

      return res.json({
        success: true,
        status: res.statusCode,
        message: `running Requests: `,
        data: runningTrainings,
      });
    } catch (err) {
      next(err);
    }
  };

  assignTrainer = async (
    req: EditTrainerRequestBody,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    try {
      const { trainingId, trainerId } = req.body;
      const training = await Training.findByPk(trainingId);
      if (training?.status == TrainingStatusEnum.accepted) {
        let startDate = req.body.startDate;
        if (!startDate) {
          await Training.update(
            { startDate: fn("CURDATE") },
            {
              where: {
                id: trainingId,
              },
            }
          );
        } else
          await Training.update(
            { startDate },
            {
              where: {
                id: trainingId,
              },
            }
          );
      }
      await Training.update(
        { status: TrainingStatusEnum.running },
        {
          where: {
            id: trainingId,
          },
        }
      );
      await Training.update(
        { trainerId },
        {
          where: {
            id: trainingId,
          },
        }
      );
      const trainer = await Trainer.findByPk(trainerId);
      return res.json({
        success: true,
        status: res.statusCode,
        message: `trainer updated successfully `,
        data: trainer,
      });
    } catch (err) {
      next(err);
    }
  };

  changeTrainingStatus = async (
    req: ChangeTrainingStatusBody,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    try {
      let { trainingId, status } = req.body;
      await Training.update(
        { status },
        {
          where: {
            id: trainingId,
          },
        }
      );
      return res.json({
        success: true,
        status: res.statusCode,
        message: `training ${status} successfully`,
      });
    } catch (err) {
      next(err);
    }
  };

  getAllTrainings = async (
    req: Request,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    try {
      const roleId = req.user.roleId;
      let trainings: Training[] = [];
      if (UserRoleEnum.UNI_TRAINING_OFFICER == roleId) {
        trainings = await Training.findAll({
          attributes: [
            "id",
            "studentId",
            "companyBranchId",
            "type",
            "status",
            "semester",
            "startDate",
            "endDate",
          ],
          include: [
            {
              model: Student,
              attributes: ["name"],
            },
            {
              model: CompanyBranch,
              include: [
                {
                  model: Company,
                  attributes: ["name"],
                },
              ],
              attributes: ["location"],
            },
          ],
        });
      } else if (UserRoleEnum.Company == roleId) {
        const branchesId = await getBranchesIds(req.user.userId);
        trainings = await Training.findAll({
          where: {
            companyBranchId: { [Op.in]: branchesId },
          },
          attributes: [
            "id",
            "studentId",
            "companyBranchId",
            "trainerId",
            "status",
            "type",
            "startDate",
            "endDate",
          ],
          include: [
            {
              model: Student,
              attributes: ["name"],
            },
            {
              model: CompanyBranch,
              attributes: ["location"],
            },
            {
              model: Trainer,
              attributes: ["name"],
            },
          ],
        });
      } else if (roleId == UserRoleEnum.TRAINER) {
        const trainingIds = await getTrainingIds(req.user.userId);
        trainings = await Training.findAll({
          where: {
            id: { [Op.in]: trainingIds },
          },
          attributes: [
            "id",
            "studentId",
            "companyBranchId",
            "status",
            "type",
            "startDate",
            "endDate",
          ],
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
        });
      } else if (roleId == UserRoleEnum.STUDENT) {
        const userId = req.user.userId;
        const studentId = await getStudentId(userId);
        trainings = await Training.findAll({
          where: { studentId },
          attributes: [
           "id",
            "type",
            "semester",
            "startDate",
            "endDate",
            "status",
            "companyBranchId",
          ],
          include: [
            {
              model: CompanyBranch,
              include: [
                {
                  model: Company,
                  attributes: ["name"],
                },
              ],
              attributes: ["location"],
            },
          ],
        });
      }
      return res.json({
        success: true,
        status: res.statusCode,
        message: "All Trainings",
        data: trainings,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default new TrainingController();
