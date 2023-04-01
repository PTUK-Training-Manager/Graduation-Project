import {Request, Response} from 'express';
import {CompanyBranch, Training} from "src/models";
import {TrainingStatusEnum,TrainingTypeEnum} from "src/enums"
import { Op } from 'sequelize';
import { TrainingType } from 'src/types';

class submitController {
    submitRequest = async (req: Request, res: Response) => {
        const studentId=req.body.studentId;
        const type:TrainingType=req.body.type;
        const companyId = req.body.companyId;
        const location = req.body.location;

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
        if (record){
               return res.status(401).json({error: `student ${studentId} has ${record.status} traing `});
            }
        
        //to check that student finished first Training
        if(type==TrainingTypeEnum.second){
         record = await Training.findOne({
             where: {
               studentId: studentId,
              status:TrainingStatusEnum.submitted,
              type: TrainingTypeEnum.first
             }
           });
        if(!record){
            return res.status(401).json({error: `student ${studentId}  sholud finished first Training  `});  
        }       
        }
        if(type==TrainingTypeEnum.compound){
            record = await Training.findOne({
                where: {
                  studentId: studentId,
                  [Op.or]: [
                    { type: TrainingTypeEnum.first},
                    { type: TrainingTypeEnum.second }
                  ],
                  status: {
                    [Op.notIn]: [TrainingStatusEnum.rejected, TrainingStatusEnum.canceled]
                  }
                }
              });
           if(record){
               return res.status(401).json({error: `student ${studentId} has ${record.type} traing `});  
           }       
           }
           const companyBranch = await CompanyBranch.findOne({
            where: {
              location: location,
              companyId: companyId,
            }
          });
          try {
            const request= await Training.create({
              type:type,
              status: TrainingStatusEnum.pending,
              studentId: studentId,
              companyBranchId:companyBranch?.id 
            });
            return res.json({ request, msg: "Successfully SUBMITTED RREQUEST" });
          } catch (e) {
            return res.json(e);
          }

          




    }
}
export default new submitController()
