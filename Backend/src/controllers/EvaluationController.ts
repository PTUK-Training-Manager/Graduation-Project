import { NextFunction, Request, Response } from "express";
import moment, { Duration } from "moment";
import {
  Evaluation,
  Note,
  Training,
  User,
  Trainer,
  Student,
} from "../models/index";
import { fn, col, Op } from "sequelize";
import {
  EvaluationStatusEnum,
  TrainingStatusEnum,
  TrainingTypeEnum,
} from "../enums";
import {
  BaseResponse,
  EditEvaluationBody,
  EvaluationType,
  GridResponse,
  ProgressFormBody,
  ProgressFormWithHours,
  RejectEvaluationBody,
  SubmitEvaluationBody,
} from "../types";
import { getTrainingIds } from "../utils";
class EvaluationController {
  calcHours = async (trainingId: number) => {
    const evaluationRecords = await Evaluation.findAll({
      attributes: [
        [fn("TIMEDIFF", col("endTime"), col("startTime")), "duration"],
      ],
      where: {
        trainingId,
        status: EvaluationStatusEnum.signed,
      },
    });
    const totalDuration = evaluationRecords
      .map((ev) => ev.get("duration") as string)
      .reduce((total, curr) => {
        const currentDur = moment.duration(curr);
        return total + currentDur.asHours();
      }, 0);

    return totalDuration;
  };

  generateProgressForm = async (
    req: ProgressFormBody,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    try {
      const trainingId = req.body.trainingId;
      const progressForm = await Evaluation.findAll({
        where: {
          trainingId,
          status: EvaluationStatusEnum.signed,
        },
      });
      const achievedHours = await this.calcHours(trainingId);
      const training = await Training.findByPk(trainingId);
      const type = training?.type;
      let totalHours;
      if (type === TrainingTypeEnum.first || type === TrainingTypeEnum.second) {
        totalHours = 200;
      } else totalHours = 400;

      const data: ProgressFormWithHours = {
        totalHours: totalHours,
        achievedHours: achievedHours,
        progressForm: progressForm,
      };
      return res.json({
        success: true,
        status: res.statusCode,
        message: "All Trainings",
        data: data,
      });
    } catch (err) {
      next(err);
    }
  };

  getPendingEvaluations = async (req: Request, res: Response<BaseResponse>, next: NextFunction) => {
    try {

      const userId = req.user.userId;
      const trainingIds = await getTrainingIds(userId);
      const pendingEvaluations = await Evaluation.findAll({
        where: {
          status: EvaluationStatusEnum.pending,
          trainingId: { [Op.in]: trainingIds }
        }, include: [
          {
            model: Training,
            attributes: ['StudentId'],
            include: [{
              model: Student,
              attributes: ['name']
            }]
          }
        ]
      });
      return res.json({
        success: true,
        status: res.statusCode,
        message: "pending evaluations",
        data: pendingEvaluations
      });

    } catch (err) {
      next(err);
    }
  }

  signEvaluation = async (
    req: Request<unknown, unknown, { id: number }>,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    try {
      const id = req.body.id;
      await Evaluation.update(
        { status: EvaluationStatusEnum.signed },
        {
          where: {
            id,
          },
        }
      );
      return res.json({
        success: true,
        status: res.statusCode,
        message: "evaluation signed successfully",
      });
    } catch (err) {
      next(err);
    }
  };

  rejectEvaluation = async (
    req: RejectEvaluationBody,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    try {
      const { id, note } = req.body;
      const noteRecoed = await Note.create({ note });
      const noteId = noteRecoed.id;
      await Evaluation.update(
        { status: EvaluationStatusEnum.rejected, noteId },
        {
          where: {
            id,
          },
        }
      );
      return res.json({
        success: true,
        status: res.statusCode,
        message: "evaluation rejected successfully",
      });
    } catch (err) {
      next(err);
    }
  };

  convert12to24 = (time: string): string => {
    const [hours, minutes, seconds] = time.split(":");
    const hours24 = parseInt(hours) + 12;
    const minutes24 = parseInt(minutes);
    const seconds24 = parseInt(seconds);
    return `${hours24}:${minutes24}:${seconds24}`;
  };

  submitEvaluation = async (
    req: SubmitEvaluationBody,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    try {
      let {
        startTime,
        startTimeType,
        endTime,
        endTimeType,
        skills,
        trainingId,
        date,
      } = req.body;
      if (startTimeType === "pm") startTime = this.convert12to24(startTime);
      if (endTimeType === "pm") endTime = this.convert12to24(endTime);
      const evaluation = await Evaluation.create({
        startTime: startTime as unknown as Date,
        endTime: endTime as unknown as Date,
        skills,
        trainingId,
        status: EvaluationStatusEnum.pending,
        date,
      });

      return res.json({
        success: true,
        status: res.statusCode,
        message: `evaluation created successfully`,
        data: evaluation,
      });
    } catch (err) {
      next(err);
    }
  };

  editEvaluation = async (
    req: EditEvaluationBody,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    try {
      let { id, skills, startTime, endTime, date, startTimeType, endTimeType } =
        req.body;
      if (!skills && !startTime && !endTime && !date) {
        return res.json({
          success: true,
          status: res.statusCode,
          message: "There is nothing to update",
        });
      }
      if (skills) {
        await Evaluation.update({ skills }, { where: { id } });
      }
      if (startTime) {
        if (startTimeType === "pm") startTime = this.convert12to24(startTime);
        await Evaluation.update(
          { startTime: startTime as unknown as Date },
          { where: { id } }
        );
      }
      if (endTime) {
        if (endTimeType === "pm") endTime = this.convert12to24(endTime);
        await Evaluation.update(
          { endTime: endTime as unknown as Date },
          { where: { id } }
        );
      }
      if (date) {
        await Evaluation.update({ date }, { where: { id } });
      }

      await Evaluation.update(
        { status: EvaluationStatusEnum.pending },
        { where: { id } }
      );

      return res.json({
        success: true,
        status: res.statusCode,
        message:
          "The Evaluation successfully updated and submitted to trainer ",
      });
    } catch (err) {
      next(err);
    }
  };

  getRejectedEvaluations = async (
    req: Request<
      unknown,
      unknown,
      { trainingId: number }
    >,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const trainingId = req.body.trainingId;
      const rejectedEvaluations = await Evaluation.findAll({
        where: {
          trainingId,
          status: EvaluationStatusEnum.rejected,
        },
        include: [
          {
            model: Note,
            attributes: ["note"],
          },
        ],
      });

      return res.json({
        success: true,
        status: res.statusCode,
        message: " ",
        data: rejectedEvaluations,
      });
    } catch (err) {
      next(err);
    }
  };

  getStudentPendingEvaluations = async (
    req: Request<
      unknown,
      unknown,
      { trainingId: number }
    >,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const trainingId = req.body.trainingId;
      const pendingEvaluations = await Evaluation.findAll({
        where: {
          trainingId,
          status: EvaluationStatusEnum.pending,
        },
      });

      return res.json({
        success: true,
        status: res.statusCode,
        message: " ",
        data: pendingEvaluations,
      });
    } catch (err) {
      next(err);
    }
  };
}
export default new EvaluationController();