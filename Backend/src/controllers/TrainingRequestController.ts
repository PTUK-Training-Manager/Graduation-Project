import {NextFunction, Request, Response} from 'express';
import {CompanyBranch, Student, Training, Company, Question, Note, AnsweredQuestion} from "../models";
import {TrainingStatusEnum, TrainingTypeEnum} from "../enums"
import {Op} from 'sequelize';
import {GeneratedResponse} from '../types';

class TrainingRequestController {

    submitRequest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {studentId, type, companyId, location,semester} = req.body;
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
                    stack: record
                });
            }

            // to check that student finished first Training
            if (type === TrainingTypeEnum.second) {
                record = await Training.findOne({
                    where: {
                        studentId: studentId,
                        status: TrainingStatusEnum.submitted,
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
                            {type: TrainingTypeEnum.first},
                            {type: TrainingTypeEnum.second}
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
                        stack: record
                    });
                }
            }
            const companyBranch = await CompanyBranch.findOne({
                where: {
                    location: location,
                    companyId: companyId,
                }
            });

            const student = await Student.findOne({
                where: {id: studentId}
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
                semester:semester,
                status: TrainingStatusEnum.pending,
                studentId: studentId,
                companyBranchId: companyBranch?.id
            });

            return res.json({
                success: true,
                status: res.statusCode,
                message: "Successfully SUBMITTED RREQUEST",
                stack: request
            });
        } catch (err) {
            next(err);
        }
    }

    getPendingRequest = async (req: Request, res: Response, next: NextFunction) => {
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
                stack: trainingRequestsRecords
            });
        } catch (err) {
            next(err);
        }
    }

    deleteRequest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let {id} = req.params;
            const deletedRequest = await Training.destroy({
                where: {id}
            });
            if (!deletedRequest)
                return res.json({
                    success: false,
                    status: res.statusCode,
                    message: "something went wrong ",
                });

            return res.json( {
                success: true,
                status: res.statusCode,
                message: `training deleted successfully`,
                stack: deletedRequest
            });
        } catch (err) {
            next(err)
        }

    }
}

export default new TrainingRequestController();