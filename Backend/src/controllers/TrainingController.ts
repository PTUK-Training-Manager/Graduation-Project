import { Request, Response } from "express";
import {
    Student,
    AnsweredQuestion,
    Answer,
    Company,
    Evaluation,
    Note,
    Permission,
    Question,
    Role,
    Trainer,
    Training,
    User,
    CompanyBranch
} from "@models/index";
import { fn, col } from "sequelize";
import { TrainingStatusEnum } from "src/enums";
class TrainingController {
     getCompletedTrainings= async(req: Request, res: Response) => {
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
        return res.json(completedStudents);
    }
    generateEvaluationForm= async(req:Request, res:Response)=>{
        const test = Training.findAll({
            where: { id: 2 },
            include: [
              { model: Student },
              { model: Evaluation },
              { model: Note },
              { model: AnsweredQuestion },
              { model: Question },
              { model: Role },
              { model: Answer },
              { model: Company },
              { model: Trainer }
            ]
          })
    }
  
    
}
export default new TrainingController();