import {Request, Response} from 'express';
import {CompanyBranch, Student, Training, Company} from "src/models";
import {TrainingStatusEnum, TrainingTypeEnum} from "src/enums"
import {Op} from 'sequelize';

class TrainingRequestController {
    submitRequest = async (req: Request, res: Response) => {
        const {studentId, type, companyId, location} = req.body;
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
            return res.status(400).json({error: `student ${studentId} has ${record.status} traing `});
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
                return res.status(400).json({error: `student ${studentId}  sholud finished first Training  `});
            }
        }
        if (type == TrainingTypeEnum.compound) {
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
                return res.status(400).json({error: `student ${studentId} has ${record.type} traing `});
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
                where: {id: studentId}
            });
            if (!student)
                return res.status(400).json({error: `student ${studentId} not found `});

            const request = await Training.create({
                type: type,
                status: TrainingStatusEnum.pending,
                studentId: studentId,
                companyBranchId: companyBranch?.id
            });
            return res.json({request, msg: "Successfully SUBMITTED RREQUEST"});
        } catch (e) {
            return res.json(e);
        }
    }

    getPendingRequest = async (req: Request, res: Response) => {
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
        return res.json({records: trainingRequestsRecords, msg: "pending request"});
    }

    deleteRequest = async (req: Request, res: Response) => {

        try {
            let {id} = req.params;
            const deletedRequest = await Training.destroy({
                where: {id}
            });
            if (!deletedRequest)
                return res.json("something went wrong ");
            return res.json(`traing deleted successfully`);
        } catch (e) {
            return res.json({msg: "fail to read", status: 500, route: "/read"});
        }

    }
}

export default new TrainingRequestController();