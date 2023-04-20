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
    User
} from "../models/index";
import { fn, col, Op } from "sequelize";
import { TrainingStatusEnum, UserRoleEnum } from "../enums";
import { ButtonHandler, BaseResponse, TrainingRequestBody, SubmitBody, AddedRecord, EditTrainerRequestBody, ChangeTrainingStatusBody } from "../types";
import { getBranchedIds } from "../utils";

class TrainingController {
    getCompletedTrainings = async (req: Request, res: Response<BaseResponse>, next: NextFunction) => {
        try {
            const roleId = req.user.roleId;
            let completedStudents: Training[] = [];
            if (UserRoleEnum.UNI_TRAINING_OFFICER == roleId) {
                completedStudents = await Training.findAll({
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
            } else if (UserRoleEnum.Company == roleId) {
                const branchesId = await  getBranchedIds(req.user.username);
                completedStudents = await Training.findAll({
                    where: {
                        status: TrainingStatusEnum.completed,
                        companyBranchId: { [Op.in]: branchesId }
                    },
                    attributes: ['id', 'studentId', 'companyBranchId', 'trainerId'],
                    include: [
                        {
                            model: Student,
                            attributes: ['name']
                        },
                        {
                            model: CompanyBranch,
                            attributes: ['location']
                        },
                        {
                            model: Trainer,
                            attributes: ['name']
                        },
                    ]
                });
            }
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

    handleGenerateFormButton = async (req: ButtonHandler, res: Response<BaseResponse>, next: NextFunction) => {
        const { index, studentId } = req.body;
        const trainings = await Training.findAll({
            where: {
                studentId,
                status: TrainingStatusEnum.completed
            }, attributes: ['id']
        });
        req.body.trainingId = trainings[index].id;
        await this.generateEvaluationForm(req, res, next);
    }

    generateEvaluationForm = async (req: ButtonHandler, res: Response<BaseResponse>, next: NextFunction) => {
        try {
            const { trainingId } = req.body;
            const evaluationForm = await Training.findAll({
                where: { id: `${trainingId}` },
                include: [
                    { model: Student },
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
                    { model: Trainer, attributes: ['name'] }
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

    //خليته يرجع البيانات مع اسم الطالب يعني عملت جوين
    async submittedStudents(req: Request, res: Response<BaseResponse>, next: NextFunction) {
        try {
            const record = await Training.findAll({
                where: {
                    status: TrainingStatusEnum.submitted,
                },
                include: [
                    {
                        model: Student,
                        attributes: ['name']
                    },
                ]
            })
            return res.json({
                success: true,
                status: res.statusCode,
                message: "Submitted Students: ",
                data: record
            });
        }
        catch (err) {
            next(err);
        }
    }

    async getQuestions(req: TrainingRequestBody, res: Response<BaseResponse>, next: NextFunction) {
        try {
            const roleId  = req.user.roleId;
            const record = await Question.findAll({
                where: {
                    roleId,
                }
            })
            return res.json({
                success: true,
                status: res.statusCode,
                message: "Qustions: ",
                data: record
            });
        } catch (err) {
            next(err);
        }
    }

    submitQuestions = async (req: SubmitBody, res: Response<BaseResponse>, next: NextFunction) => {
        try {
            const { trainingId, arrayData } = req.body

            const promises:Promise<AnsweredQuestion|Note>[] =[]

            for(let i=0;i< arrayData.length;i++) {
                let currentData=arrayData[i]
               
                
                if (currentData.note) {
                    //خزن النوت ف جدول النوت
                    const noteRecord= await Note.create({
                        note:currentData.note
                    })

                const answeredQuestionPromise= AnsweredQuestion.create({
                    trainingId,
                    questionId:currentData.questionId,
                    answerId:currentData.answerId,
                    noteId:noteRecord.id
                })
                promises.push(answeredQuestionPromise)
            }
            else{
                const answeredQuestionPromise= AnsweredQuestion.create({
                    trainingId,
                    questionId:currentData.questionId,
                    answerId:currentData.answerId
                })
                 promises.push(answeredQuestionPromise)
            }
            };

            await Promise.all(promises)

            await Training.update({ status: TrainingStatusEnum.completed }, {
                where: {
                    id: trainingId
                }
            })

            const record = await Training.findOne({
                where: { id: trainingId }
            })

            return res.json({
                success: true,
                status: res.statusCode,
                message: "The Training was successfully updated to completed",
                data: record
            });

        } catch (err) {
            next(err);
        }
    }

    // async getRecords(req: TrainingRequestBody, res: Response<BaseResponse>, next: NextFunction) {
    //     const page = req.body.page
    //     const pageSize = 10;
    //     const startIndex = (page - 1) * pageSize;
    //     const endIndex = startIndex + pageSize;
    //     let data = await Student.findAll({
    //         limit: pageSize,
    //         offset: (page - 1) * pageSize
    //     })
    //     return res.json({
    //         success: true,
    //         status: res.statusCode,
    //         message: "Students: ",
    //         data: data
    //     });
    // }

    getAcceptedTrainings = async (req: Request, res: Response<BaseResponse>, next: NextFunction) => {
        try {
            const branchesId = await  getBranchedIds(req.user.username);
            const acceptedTrainings = await Training.findAll({
                where: {
                    status: TrainingStatusEnum.accepted,
                    companyBranchId: { [Op.in]: branchesId }
                },
                attributes: ['id', 'studentId', 'companyBranchId'],
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
                message: `acceptedRequests: `,
                data: acceptedTrainings
            });

        } catch (err) {

        }
    }

    getRunningTrainings = async (req: Request, res: Response<BaseResponse>, next: NextFunction) => {
        try {
            const roleId = req.user.roleId;
            let runningTrainings: Training[] = [];
            if (roleId == UserRoleEnum.Company) {
                const branchesId = await  getBranchedIds(req.user.username);
                runningTrainings = await Training.findAll({
                    where: {
                        status: TrainingStatusEnum.running,
                        companyBranchId: { [Op.in]: branchesId }
                    },
                    attributes: ['id', 'studentId', 'companyBranchId', 'trainerId'],
                    include: [
                        {
                            model: Student,
                            attributes: ['name']
                        },
                        {
                            model: CompanyBranch,
                            attributes: ['location']
                        },
                        {
                            model: Trainer,
                            attributes: ['name']
                        },
                    ]
                });
            } else if (roleId == UserRoleEnum.UNI_TRAINING_OFFICER) {
                runningTrainings = await Training.findAll({
                    where: {
                        status: TrainingStatusEnum.running
                    },
                    attributes: ['id', 'studentId', 'companyBranchId'],
                    include: [
                        {
                            model: Student,
                            attributes: ['name']
                        },
                        {
                            model: CompanyBranch, include: [
                                {
                                    model: Company,
                                    attributes: ['name']
                                }],
                            attributes: ['location']
                        },
                    ]
                });

            }
            return res.json({
                success: true,
                status: res.statusCode,
                message: `running Requests: `,
                data: runningTrainings
            });
        } catch (err) {
            next(err);
        }
    }

    assignTrainer = async (req: EditTrainerRequestBody, res: Response<BaseResponse>, next: NextFunction) => {
        try {
            const { trainingId, trainerId } = req.body;
            await Training.update({ status: TrainingStatusEnum.running }, {
                where: {
                    id: trainingId
                }
            });
            await Training.update({ trainerId }, {
                where: {
                    id: trainingId
                }
            });
            return res.json({
                success: true,
                status: res.statusCode,
                message: `trainer updated successfully`
            });
        } catch (err) {
            next(err);
        }
    }

    changeTrainingStatus = async (req: ChangeTrainingStatusBody, res: Response<BaseResponse>, next: NextFunction) => {
        try {
            let { trainingId,status } = req.body;
            await Training.update({ status }, {
                where: {
                    id: trainingId
                }
            });
            return res.json({
                success: true,
                status: res.statusCode,
                message: `training ${status} successfully`
            });
        } catch (err) {
            next(err);
        }
    }

}

export default new TrainingController();