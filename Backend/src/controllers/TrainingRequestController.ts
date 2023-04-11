import { NextFunction, Request, Response } from 'express';
import { CompanyBranch, Student, Training, Company, Question, Note, AnsweredQuestion } from "src/models";
import { TrainingStatusEnum, TrainingTypeEnum } from "src/enums"
import { Op } from 'sequelize';
import { GeneratedResponse } from 'src/types';

interface TrainingRequestBody extends Request {
    body: {
        role: number;
        trainingId:number;
        questionID:number;
        note:string;
    }
}
class TrainingRequestController {
    // constructor() {
    //     this.getQuestions=this.getQuestions.bind(this);
    // }
    submitRequest = async (req: Request, res: Response, next: NextFunction) => {
        const { studentId, type, companyId, location } = req.body;
        //to check that student has only one training for a type
        var record = await Training.findOne({
            where: {
                studentId: studentId,
                type: type,
                status: {
                    [Op.notIn]: [TrainingStatusEnum.rejected, TrainingStatusEnum.canceled]
                }
            }
        });
        if (record) {
            let response: GeneratedResponse = {
                success: false,
                status: res.statusCode,
                message: `student ${studentId} has ${record.status} traing `,
                data: record
            }
            return res.json(response);
        }

        //to check that student finished first Training
        if (type == TrainingTypeEnum.second) {
            record = await Training.findOne({
                where: {
                    studentId: studentId,
                    status: TrainingStatusEnum.submitted,
                    type: TrainingTypeEnum.first
                }
            });
            if (!record) {
                let response: GeneratedResponse = {
                    success: false,
                    status: res.statusCode,
                    message: `student ${studentId}  sholud finished first Training  `
                }
                return res.json(response);
            }
        }
        if (type == TrainingTypeEnum.compound) {
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
                let response: GeneratedResponse = {
                    success: false,
                    status: res.statusCode,
                    message: `student ${studentId} has ${record.type} traing `,
                    data: record
                }
                return res.json(response);
            }
        }
        const companyBranch = await CompanyBranch.findOne({
            where: {
                location: location,
                companyId: companyId,
            }
        });
        try {
            const student = await Student.findOne({
                where: { id: studentId }
            });
            if (!student) {
                let response: GeneratedResponse = {
                    success: false,
                    status: res.statusCode,
                    message: `student ${studentId} not found `
                }
                return res.json(response);
            }
            const request = await Training.create({
                type: type,
                status: TrainingStatusEnum.pending,
                studentId: studentId,
                companyBranchId: companyBranch?.id
            });
            let response: GeneratedResponse = {
                success: true,
                status: res.statusCode,
                message: "Successfully SUBMITTED RREQUEST",
                data: request
            }
            return res.json(response);
        } catch (err) {
            next(err);
        }
    }

    getPendingRequest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const trainingRequestsRecords = await Training.findAll({
                attributes: ['trainingId', 'studentId', 'companyBranchId'],
                where: {
                    status: TrainingStatusEnum.pending
                },
                include: [
                    {
                        model: Student,
                        attributes: ['studentName']
                    },
                    {
                        model: CompanyBranch,
                        attributes: ['location'],
                        include: [
                            {
                                model: Company,
                                attributes: ['companyName']
                            }
                        ]
                    }
                ]
            });
            let response: GeneratedResponse = {
                success: true,
                status: res.statusCode,
                message: "pending request",
                data: trainingRequestsRecords
            }
            return res.json(response);
        }
        catch (err) {
            next(err);
        }
    }

    deleteRequest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let { id } = req.params;
            const deletedRequest = await Training.destroy({
                where: { id }
            });
            if (!deletedRequest) {
                let response: GeneratedResponse = {
                    success: false,
                    status: res.statusCode,
                    message: "something went wrong ",
                }
                return res.json(response);
            }
            let response: GeneratedResponse = {
                success: true,
                status: res.statusCode,
                message: `training deleted successfully`,
                data: deletedRequest
            }
            return res.json(response);
        } catch (err) {
            next(err)
        }

    }


    //خليته يرجع البيانات مع اسم الطالب يعني عملت جوين 
    async submittedStudents(req: Request, res: Response, next: NextFunction) {
        try {
           const record = await Training.findOne({
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
            let response: GeneratedResponse = {
                success: true,
                status: res.statusCode,
                message:"Submitted Students: ",
                data: record
            }
            return res.json(response); 
        }
        catch (err) {
            next(err);
        }
    }

    async getQuestions(req: TrainingRequestBody, res: Response, next: NextFunction) {
        try {
        const {role}=req.body;
           const record = await Question.findAll({
                where: {
                    roleId: role,
                }
            })
            let response: GeneratedResponse = {
                success: true,
                status: res.statusCode,
                message:"Qustions: ",
                data: record
            }
            return res.json(response); 
        }
        catch (err) {
            next(err);
        }
    }

    async submitQuestionsWithAnswers(req: TrainingRequestBody, res: Response, next: NextFunction) {
        try {
        const {trainingId,questionID,note}=req.body; 

        //خزن النوت ف جدول النوت
           const noteid = await Note.create({
                note: note
            })

            const answeredQuestion=await AnsweredQuestion.create({
                trainingId:trainingId,
                questionId:questionID,
                noteId:noteid.id
            })

            await Training.update({status:"completed"},{
                where:{
                    id:trainingId
                }
            })
            const record=await Training.findOne({
                where: {id:trainingId}
            })

            let response: GeneratedResponse = {
                success: true,
                status: res.statusCode,
                message:"The Training was successfully updated to completed",
                data: record
            }
            return res.json(response); 
        }
        catch (err) {
            next(err);
        }
    }


  

    async submitTrainingwithoutAnswers(req: Request, res: Response, next: NextFunction) {
        try {
            const {trainingId}=req.body; 
                await Training.update({status:"completed"},{
                    where:{
                        id:trainingId
                    }
                })
                const record=await Training.findOne({
                    where: {id:trainingId}
                })
    
                let response: GeneratedResponse = {
                    success: true,
                    status: res.statusCode,
                    message:"The Training was successfully updated to completed",
                    data: record
                }
                return res.json(response); 
            }
            catch (err) {
                next(err);
            }
        }
    }

export default new TrainingRequestController();