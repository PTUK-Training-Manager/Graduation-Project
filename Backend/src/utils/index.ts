import { NextFunction, Request, Response } from "express";
import {
    Company,
    CompanyBranch,
    User,
    Trainer,
    Training,
    Student
} from "../models/index";
import { TrainingStatusEnum } from "../enums";
export const getBranchesIds = async (userId: number) => { //get branches for company
    const company = await Company.findOne({
        where: { userId },
        attributes: ['id']
    });
    const companyId = company?.id;
    const companyBranches = await CompanyBranch.findAll({
        where: { companyId },
        attributes: ['id']
    });
    const branchesIds = companyBranches.map(obj => obj.id);
    return branchesIds;
}

export const getTrainingIds = async (userId: number) => { //get trainings for trainer
    const trainer = await Trainer.findOne({
        where: { userId },
        attributes: ['id']
    });
    const trainerId = trainer?.id;
    const trainings = await Training.findAll({
        where: {
            trainerId
        }
    });
    const trainingIds = trainings.map(obj => obj.id);
    return trainingIds;
}
export const getStudentId = async (userId: number) => { //get trainings for trainer

    const student = await Student.findOne({
        where: { userId },
        attributes: ['id']
    });
    const studentId = student?.id;
    return studentId;
}

export const getCompanyId = async (userId: number) => { //get trainings for trainer
    const company = await Company.findOne({
        where: { userId },
        attributes: ['id']
    });
    const companyId = company?.id;
    return companyId;
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