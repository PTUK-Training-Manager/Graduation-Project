import { NextFunction, Request, Response } from "express";
import {
    Company,
    CompanyBranch,
    User,
    Trainer,
    Training
} from "../models/index";
export const getBranchesIds = async (username: string) => { //get branches for company
    const user = await User.findOne({
        where: { username },
        attributes: ['id']
    });
    const userId = user?.id;
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

export const getTrainingIds = async (username: string) => { //get trainings for trainer
    const user = await User.findOne({
        where: { username },
        attributes: ['id']
    });
    const userId = user?.id;
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