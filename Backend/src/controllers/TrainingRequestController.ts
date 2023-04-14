import { NextFunction, Request, Response } from 'express';
import { CompanyBranch, Student, Training, Company } from "../models";
import { TrainingStatusEnum, TrainingTypeEnum } from "../enums"
import { Op } from 'sequelize';
import { GeneratedResponse } from '../types';

class TrainingRequestController {
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
}

export default new TrainingRequestController();