import {NextFunction, Request, Response} from "express";
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
    CompanyBranch
} from "../models/index";
import {fn, col} from "sequelize";
import {TrainingStatusEnum} from "../enums";
import {ButtonHandler} from "../types";

class TrainingController {
    getCompletedTrainings = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const completedStudents = await Training.findAll({
                attributes: ['studentId', [fn('COUNT', col('studentId')), 'count']],
                where: {
                    status: TrainingStatusEnum.completed
                }, include: [
                    {
                        model: Student,
                        attributes: ['name']
                    }]
                ,
                group: ['studentId']
            });

            return res.json({
                success: true,
                status: res.statusCode,
                message: "Completed Trainings",
                data: completedStudents
            });
        }
        catch (err) {
            next(err);
        }
    }

    handleGenerateFormButton = async (req: ButtonHandler, res: Response, next: NextFunction) => {
        const {index, studentId} = req.body;
        const trainings = await Training.findAll({
            where: {
                studentId,
                status: TrainingStatusEnum.completed
            }, attributes: ['id']
        });

        req.body.trainingId = trainings[index].id;

        await this.generateEvaluationForm(req, res, next);
    }

    generateEvaluationForm = async (req: ButtonHandler, res: Response, next: NextFunction) => {
        try {
            const {trainingId} = req.body;
            const evaluationForm = await Training.findAll({
                where: {id: `${trainingId}`},
                include: [
                    {model: Student},
                    {
                        model: Evaluation, include: [
                            {
                                model: Note,
                                attributes: ['note']
                            }
                        ]
                    },
                    {
                        model: AnsweredQuestion, include: [
                            {
                                model: Question,
                                attributes: ['question']
                            }
                            , {
                                model: Note,
                                attributes: ['note']
                            }, {
                                model: Answer,
                                attributes: ['answer']
                            }
                        ], attributes: ['id']
                    },
                    {
                        model: CompanyBranch, include: [
                            {
                                model: Company,
                                attributes: ['name']
                            }],
                        attributes: ['location']
                    },
                    {model: Trainer, attributes: ['name']}
                ]
            });

            return res.json({
                success: true,
                status: res.statusCode,
                message: "Evaluation Form",
                data: evaluationForm
            });
        } catch (err) {
            next(err);
        }
    }
}

export default new TrainingController();