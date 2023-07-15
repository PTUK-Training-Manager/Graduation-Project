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
import { fn, col, Op, QueryTypes, FindOptions, InferAttributes } from "sequelize";
import {
  TrainingStatusEnum,
  UserRoleEnum,
  EvaluationStatusEnum,
} from "../enums";
import {
  ButtonHandler,
  BaseResponse,
  TrainingRequestBody,
  SubmitBody,
  EditTrainerRequestBody,
  ChangeTrainingStatusBody,
  GridResponse,
  PaginatedRequest,
} from "../types";
import { getBranchesIds, getStudentId, getTrainingIds } from "../utils";
import sequelize from "../config/connection";
import { DEFAULT_PAGE_SIZE, COMPOUND_TRAINING_HOURS, FIRST_TRAINING_HOURS } from "../constants";

class TrainingController {
  getCompletedTrainings = async (
    req: PaginatedRequest,
    res: Response<GridResponse>,
    next: NextFunction
  ) => {
    try {
      const page = +req.query?.page || 0;
      const size = +req.query?.size || DEFAULT_PAGE_SIZE;
      const roleId = req.user.roleId;
      let completedTrainings: Training[] = [];
      let options: FindOptions<InferAttributes<Training>> = {};
      if (UserRoleEnum.UNI_TRAINING_OFFICER == roleId) {
        options = {
          where: {
            status: TrainingStatusEnum.completed,
          },
          include: [
            {
              model: Student,
              attributes: ["name"],
            },
          ],
          group: ["studentId"]
        }
        completedTrainings = await Training.findAll({
          ...options,
          attributes: ["studentId", [fn("COUNT", col("studentId")), "count"]],
          limit: size,
          offset: page * size,
        });
        const tot = await Training.count({
          where: {
            status: TrainingStatusEnum.completed,
          },
          include: [
            {
              model: Student,
              attributes: ["name"],
            },
          ],
          group: ["studentId"]
        });
        console.log(tot);
      } else if (UserRoleEnum.Company == roleId) {
        const branchesId = await getBranchesIds(req.user.userId);
        options = {
          where: {
            status: TrainingStatusEnum.completed,
            companyBranchId: { [Op.in]: branchesId },
          }
        }
        completedTrainings = await Training.findAll({
          ...options,
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
          limit: size,
          offset: page * size
        });
      } else if (roleId == UserRoleEnum.TRAINER) {
        const trainingIds = await getTrainingIds(req.user.userId);
        options = {
          where: {
            status: TrainingStatusEnum.completed,
            id: { [Op.in]: trainingIds },
          }
        }
        completedTrainings = await Training.findAll({
          ...options,
          attributes: ["id", "studentId"],
          include: [
            {
              model: Student,
              attributes: ["name"],
            },
          ],
          limit: size,
          offset: page * size,
        });
      }
      let totalItems = await Training.count(options);
      if (Array.isArray(totalItems))
        totalItems = totalItems.length;
      console.log(totalItems)
      return res.json({
        items: completedTrainings,
        pageNumber: page,
        pageSize: size,
        totalItems,
        totalPages: Math.ceil(totalItems / size)
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

  getRunningAndFinishedTrainings = async (
    req: PaginatedRequest,
    res: Response<GridResponse>,
    next: NextFunction
  ) => {
    try {
      const page = +req.query?.page || 0;
      const size = +req.query?.size || DEFAULT_PAGE_SIZE;

      const userId = req.user.userId;

      const trainer = await Trainer.findOne({
        where: { userId },
        attributes: ["id"],
      });


      const query = `
                SELECT Tr.*,
                St.name,
                (SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(Ev.endTime, Ev.startTime))))) as totalDuration
                FROM Trainings as Tr
                JOIN Students as St ON St.id = Tr.studentId
                JOIN Evaluations as Ev ON Ev.trainingId = Tr.id AND Ev.status = "signed"
                WHERE Tr.status = "running"
                AND Tr.trainerId = ${trainer?.id} -- get this from the trainerId
                GROUP BY Tr.id
                HAVING
                  (TIME_TO_SEC(totalDuration) >= TIME_TO_SEC("${FIRST_TRAINING_HOURS}:00:00") AND Tr.type IN ("first", "second"))
                  OR
                  (TIME_TO_SEC(totalDuration) >= TIME_TO_SEC("${COMPOUND_TRAINING_HOURS}:00:00") AND Tr.type = "compound")
                ORDER BY totalDuration desc
                LIMIT ${size} OFFSET ${page * size}
            `;

      const result = await sequelize.query(query, {
        type: QueryTypes.SELECT,
        model: Training,
        mapToModel: true,
        raw: false,
      });

      // totalItems & totalPages are not needed because they are expensive to calculate!
      return res.json({
        items: result,
        pageNumber: page,
        pageSize: size,
      });
    }
    catch (err) {
      next(err);
    }
  };

  getsubmittedStudents = async (
    req: PaginatedRequest,
    res: Response<GridResponse>,
    next: NextFunction
  ) => {
    try {
      const page = +req.query?.page || 0;
      const size = +req.query?.size || DEFAULT_PAGE_SIZE;
      let options = {
        where: {
          status: TrainingStatusEnum.submitted,
        }
      }
      const submittedStudents = await Training.findAll({
        ...options,
        include: [
          {
            model: Student,
            attributes: ["name"],
          },
        ],
        limit: size,
        offset: page * size,
      });
      const totalItems = await Training.count();
      return res.json({
        items: submittedStudents,
        pageNumber: page,
        pageSize: size,
        totalItems,
        totalPages: Math.ceil(totalItems / size)
      })
    } catch (err) {
      next(err);
    }
  };

  getQuestions = async (
    req: TrainingRequestBody,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
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
  };

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
          status: TrainingStatusEnum.accepted,
          companyBranchId: { [Op.in]: branchesId },
        }
      }
      const acceptedTrainings = await Training.findAll({
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
          },
        ],
        limit: size,
        offset: page * size,
      });

      const totalItems = await Training.count(options);

      return res.json({
        items: acceptedTrainings,
        pageNumber: page,
        pageSize: size,
        totalItems,
        totalPages: Math.ceil(totalItems / size)
      });
    } catch (err) {
      next(err);
    }
  };

  getRunningTrainings = async (
    req: PaginatedRequest,
    res: Response<GridResponse>,
    next: NextFunction
  ) => {
    try {
      const page = +req.query?.page || 0;
      const size = +req.query?.size || DEFAULT_PAGE_SIZE;

      const roleId = req.user.roleId;
      let runningTrainings: Training[] = [];
      let options: FindOptions<InferAttributes<Training>> = {};

      if (roleId == UserRoleEnum.Company) {
        const branchesId = await getBranchesIds(req.user.userId);

        options = {
          where: {
            status: TrainingStatusEnum.running,
            companyBranchId: { [Op.in]: branchesId },
          },
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
        }
        runningTrainings = await Training.findAll({
          ...options,
          attributes: ["id", "studentId", "companyBranchId", "trainerId"],
          limit: size,
          offset: page * size,
        });
      } else if (roleId == UserRoleEnum.UNI_TRAINING_OFFICER) {
        options = {
          where: {
            status: TrainingStatusEnum.running,
          },
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
        }
        runningTrainings = await Training.findAll({
          ...options,
          attributes: ["id", "studentId", "companyBranchId"],
          limit: size,
          offset: page * size
        });
      } else if (roleId == UserRoleEnum.TRAINER) {
        const trainingIds = await getTrainingIds(req.user.userId);

        options = {
          where: {
            status: TrainingStatusEnum.running,
            id: { [Op.in]: trainingIds },
          },
          include: [
            {
              model: Student,
              attributes: ["name"],
            },
          ],
        }

        runningTrainings = await Training.findAll({
          ...options,
          attributes: ["id", "studentId"],
          limit: size,
          offset: page * size,
        });
      }
      const totalItems = await Training.count(options);
      return res.json({
        items: runningTrainings,
        pageNumber: page,
        pageSize: size,
        totalItems,
        totalPages: Math.ceil(totalItems / size)
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
    req: PaginatedRequest,
    res: Response<GridResponse>,
    next: NextFunction
  ) => {
    try {
      const page = +req.query?.page || 0;
      const size = +req.query?.size || DEFAULT_PAGE_SIZE;
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
          limit: size,
          offset: page * size,
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
          limit: size,
          offset: page * size,
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
          ], limit: size,
          offset: page * size,
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
          limit: size,
          offset: page * size,
        });
      }
      const totalItems = await Training.count();
      return res.json({
        items: trainings,
        pageNumber: page,
        pageSize: size,
        totalItems,
        totalPages: Math.ceil(totalItems / size)
      });


    } catch (err) {
      next(err);
    }
  };

  getStudentTrainingId = async (
    req: Request,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    try {
      const userId = req.user.userId;
      const studentId = await getStudentId(userId);
      const runningTraining = await Training.findOne({
        where: {
          status: TrainingStatusEnum.running,
          studentId,
        },
      });
      return res.json({
        success: true,
        status: res.statusCode,
        message: "All Trainings",
        data: { trainingId: runningTraining?.id },
      });
    } catch (err) {
      next(err);
    }
  };
}

export default new TrainingController();
