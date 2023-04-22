import { NextFunction, Request, Response } from "express";
import moment, { Duration } from 'moment';
import {
    Evaluation,
    Note,
    Training,
    User,
    Trainer
} from "../models/index";
import { fn, col, Op} from "sequelize";
import { EvaluationStatusEnum, TrainingTypeEnum } from "../enums";
import {  BaseResponse, ProgressFormBody, ProgressFormWithHours, RejectEvaluationBody } from "../types";
import { getTrainingIds } from "../utils";

class EvaluationController {
    calcHours = async (trainingId: number) => {
        const durations = await Evaluation.findAll({
            attributes: [
                [fn('TIMEDIFF', col('endTime'), col('startTime')), 'duration'],
            ],
            where: { trainingId }
        });
        let totalDuration: Duration = moment.duration();
        for (let i = 0; i < durations.length; i++) {
            const duration = durations[i].get('duration') as string;
            const time = moment.duration(duration);
            totalDuration = totalDuration.add(time);
        }
        return totalDuration.asHours();
    }

    generateProgressForm = async (req: ProgressFormBody, res: Response<BaseResponse>, next: NextFunction) => {
        try {
            const trainingId = req.body.trainingId;
            const progressForm = await Evaluation.findAll({
                where: { trainingId },
                include: [
                    {
                        model: Note,
                        attributes: ['note']
                    }
                ]
            });
            const achievedHours = await this.calcHours(trainingId);
            const training = await Training.findByPk(trainingId);
            const type = training?.type;
            let totalHours;
            if (type === TrainingTypeEnum.first || type === TrainingTypeEnum.second) {
                totalHours = 200;
            }
            else
                totalHours = 400;

            const data: ProgressFormWithHours = {
                totalHours: totalHours,
                achievedHours: achievedHours,
                progressForm: progressForm
            };
            return res.json({
                success: true,
                status: res.statusCode,
                message: "All Trainings",
                data: data
            });
        } catch (err) {
            next(err);
        }
    }

    getPendingEvaluations= async(req:Request, res:Response<BaseResponse>, next:NextFunction ) => {
        try{
            const username = req.user.username;
            
            const trainingIds = await getTrainingIds(username);
            const pendingEvaluations = await Evaluation.findAll({
                where:{
                status: EvaluationStatusEnum.pending,
                trainingId: { [Op.in]: trainingIds }
                }
            });
            return res.json({
                success: true,
                status: res.statusCode,
                message: "pending evaluations",
                data: pendingEvaluations});

        }catch (err) {
            next(err);
        }
    }

    signEvaluation = async (req:Request, res:Response<BaseResponse>, next:NextFunction)=>{     
        try {
            const {id} = req.params;
            await Evaluation.update({ status:EvaluationStatusEnum.signed }, {
                where: {
                    id
                }
            });
            return res.json({
                success: true,
                status: res.statusCode,
                message: "evaluation signed successfully"
            });
        } catch (err) {
            next(err);
        }

    }

    rejectEvaluation = async (req:RejectEvaluationBody, res:Response<BaseResponse>, next:NextFunction)=>{     
        try {
            const {id,note} = req.body;     
            const noteRecoed = await Note.create({note});
            const noteId= noteRecoed.id;
            await Evaluation.update({ status:EvaluationStatusEnum.rejected, rejectId:noteId }, {
                where: {
                    id
                }
            });
            return res.json({
                success: true,
                status: res.statusCode,
                message: "evaluation rejected successfully"
            });
        } catch (err) {
            next(err);
        }

    }

}
export default new EvaluationController();