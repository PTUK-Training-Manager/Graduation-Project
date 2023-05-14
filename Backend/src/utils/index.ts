import {
    Company,
    CompanyBranch,
    Trainer,
    Training,
    Student
} from "../models/index";
import { TrainingStatusEnum } from "../enums";


export const isProduction = process.env.NODE_ENV === "production";

export const getBranchesIds = async (userId: number) => { //get branches for company
    const company = await Company.findOne({
        where: {userId},
        attributes: ['id']
    });
    const companyId = company?.id;
    const companyBranches = await CompanyBranch.findAll({
        where: {companyId},
        attributes: ['id']
    });
    return companyBranches.map(obj => obj.id);
}

export const getTrainingIds = async (userId: number) => { //get trainings for trainer
    const trainer = await Trainer.findOne({
        where: {userId},
        attributes: ['id']
    });
    const trainerId = trainer?.id;
    const trainings = await Training.findAll({
        where: {
            trainerId
        }
    });
    return trainings.map(obj => obj.id);
}
export const getStudentId = async (userId: number) => { //get trainings for trainer

    const student = await Student.findOne({
        where: {userId},
        attributes: ['id']
    });
    return student?.id;
}

export const getCompanyId = async (userId: number) => { //get trainings for trainer
    const company = await Company.findOne({
        where: {userId},
        attributes: ['id']
    });
    return company?.id;
}
export const getStudentTraining = async (userId: number)=>{
    const student = await Student.findOne({
        where: { userId },
        attributes: ['id']
    });
    const studentId = student?.id;
    const training = await Training.findOne({
        where: {
            studentId,
            status: TrainingStatusEnum.running
        },
        attributes: ['id'],
    });
    const trainingId = training?.id;
    return trainingId 
}