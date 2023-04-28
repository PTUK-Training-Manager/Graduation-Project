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
import { fn, col, Op, literal, Sequelize } from "sequelize";
import { TrainingStatusEnum, UserRoleEnum, TrainingTypeEnum, EvaluationStatusEnum } from "../enums";
import { ButtonHandler, BaseResponse, TrainingRequestBody, SubmitBody, AddedRecord, EditTrainerRequestBody, ChangeTrainingStatusBody, ProgressFormBody, ProgressFormWithHours } from "../types";
import { getBranchesIds, getTrainingIds } from "../utils";

class TrainingController {
    getCompletedTrainings = async (req: Request, res: Response<BaseResponse>, next: NextFunction) => {
        try {
            const roleId = req.user.roleId;
            let completedTrainings: Training[] = [];
            if (UserRoleEnum.UNI_TRAINING_OFFICER == roleId) {
                completedTrainings = await Training.findAll({
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
                const branchesId = await getBranchesIds(req.user.username);
                completedTrainings = await Training.findAll({
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
            } else if (roleId == UserRoleEnum.TRAINER) {
                const trainingIds = await getTrainingIds(req.user.username);
                completedTrainings = await Training.findAll({
                    where: {
                        status: TrainingStatusEnum.completed,
                        id: { [Op.in]: trainingIds }
                    },
                    attributes: ['id', 'studentId'],
                    include: [
                        {
                            model: Student,
                            attributes: ['name']
                        }
                    ]
                });
            }
            return res.json({
                success: true,
                status: res.statusCode,
                message: "Completed Trainings",
                data: completedTrainings
            });
        }
        catch (err) {
            next(err);
        }
    }

    handleGenerateFormButton = async (req: ButtonHandler, res: Response<BaseResponse>, next: NextFunction) => {

        try {
            const studentId = req.body.studentId;
            const roleId = req.user.roleId;
            const trainings = await Training.findAll({
                where: {
                    studentId,
                    status: TrainingStatusEnum.completed
                }, attributes: ['id']
            });
            if (roleId === UserRoleEnum.Company || roleId === UserRoleEnum.TRAINER)
                await this.generateEvaluationForm(req, res, next);
            else {
                const index = req.body.index;
                req.body.trainingId = trainings[index].id;
                console.log(trainings[index].id);
                await this.generateEvaluationForm(req, res, next);
            }
        }
        catch (err) {
            next(err);
        }
    }

    generateEvaluationForm = async (req: ButtonHandler, res: Response<BaseResponse>, next: NextFunction) => {
        try {
            const trainingId = req.body.trainingId;
            const evaluationForm = await Training.findAll({
                where: { id: `${trainingId}` },
                include: [
                    { model: Student },
                    {
                        model: Evaluation,
                        where: { status: EvaluationStatusEnum.signed }
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
                        model: CompanyBranch,
                        include: [
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
            const roleId = req.user.roleId;
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

            const promises: Promise<AnsweredQuestion | Note>[] = []

            for (let i = 0; i < arrayData.length; i++) {
                let currentData = arrayData[i]


                if (currentData.note) {
                    //خزن النوت ف جدول النوت
                    const noteRecord = await Note.create({
                        note: currentData.note
                    })

                    const answeredQuestionPromise = AnsweredQuestion.create({
                        trainingId,
                        questionId: currentData.questionId,
                        answerId: currentData.answerId,
                        noteId: noteRecord.id
                    })
                    promises.push(answeredQuestionPromise)
                }
                else {
                    const answeredQuestionPromise = AnsweredQuestion.create({
                        trainingId,
                        questionId: currentData.questionId,
                        answerId: currentData.answerId
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
            const branchesId = await getBranchesIds(req.user.username);
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
                const branchesId = await getBranchesIds(req.user.username);
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
            } else if (roleId == UserRoleEnum.TRAINER) {
                const trainingIds = await getTrainingIds(req.user.username);
                runningTrainings = await Training.findAll({
                    where: {
                        status: TrainingStatusEnum.running,
                        id: { [Op.in]: trainingIds }
                    },
                    attributes: ['id', 'studentId'],
                    include: [
                        {
                            model: Student,
                            attributes: ['name']
                        }
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
            const training = await Training.findByPk(trainingId);
            if(training?.status==TrainingStatusEnum.accepted){
                await Training.update({ startDate:fn('CURDATE') }, {
                    where: {
                        id: trainingId
                    }
                });
            }
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
            const trainer = await Trainer.findByPk(trainerId);
            return res.json({
                success: true,
                status: res.statusCode,
                message: `trainer updated successfully `,
                data: trainer
            });
        } catch (err) {
            next(err);
        }
    }

    changeTrainingStatus = async (req: ChangeTrainingStatusBody, res: Response<BaseResponse>, next: NextFunction) => {
        try {
            let { trainingId, status } = req.body;
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

    getAllTrainings = async (req: Request, res: Response<BaseResponse>, next: NextFunction) => {
        try {
            const roleId = req.user.roleId;
            let trainings: Training[] = [];
            if (UserRoleEnum.UNI_TRAINING_OFFICER == roleId) {
                trainings = await Training.findAll({
                    attributes: ['id', 'studentId', 'companyBranchId', 'type', 'status', 'semester', 'startDate', 'endDate'],
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
            } else if (UserRoleEnum.Company == roleId) {
                const branchesId = await getBranchesIds(req.user.username);
                trainings = await Training.findAll({
                    where: {
                        companyBranchId: { [Op.in]: branchesId }
                    },
                    attributes: ['id', 'studentId', 'companyBranchId', 'trainerId', 'status', 'type', 'startDate', 'endDate'],
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
            } else if (roleId == UserRoleEnum.TRAINER) {
                const trainingIds = await getTrainingIds(req.user.username);
                trainings = await Training.findAll({
                    where: {
                        id: { [Op.in]: trainingIds }
                    },
                    attributes: ['id', 'studentId', 'companyBranchId', 'status', 'type', 'startDate', 'endDate'],
                    include: [
                        {
                            model: Student,
                            attributes: ['name']
                        },
                        {
                            model: CompanyBranch,
                            attributes: ['location']
                        }
                    ]
                });
            }
            return res.json({
                success: true,
                status: res.statusCode,
                message: "All Trainings",
                data: trainings
            });
        }
        catch (err) {
            next(err);
        }
    }

}

export default new TrainingController();