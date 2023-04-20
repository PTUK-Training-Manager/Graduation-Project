import { NextFunction, Request, Response } from "express";
import {
    Company,
    CompanyBranch,
    User
} from "../models/index";
export const getBranchedIds = async (username: string)=>{
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
    const branchesId = companyBranches.map(obj => obj.id);
    return branchesId;
}