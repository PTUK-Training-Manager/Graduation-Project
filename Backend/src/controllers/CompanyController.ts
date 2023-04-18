import { NextFunction, Request, Response } from "express";
import UserController from "./UserController";
import Company from "../models/Company";
import CompanyBranch from "../models/CompanyBranch";
import { BranchRequestBody, CompanyRequestBody, BaseResponse } from "../types";

class CompanyController {

    constructor() {
            this.addCompany=this.addCompany.bind(this);
            this.handleAddBranch=this.handleAddBranch.bind(this);
        }


    async addCompany(req: CompanyRequestBody, res: Response<BaseResponse>, next: NextFunction) {
        const { id, name, email, location, phoneNumber, managerName } = req.body;
        try {
            const company = await Company.findByPk(id);

            if (!company) {
                const { temp, password } = await UserController.generateAccount(
                    name,
                    location
                );

                console.log(password);
                const userId = await UserController.addUser({
                    username: temp, password, email, saltRounds: 10, roleId: 6
                }); // company roleID in DataBase

                const record = await Company.create({
                    id,
                    name,
                    phoneNumber,
                    managerName,
                    userId,
                });

                if (!record)
                    return res.json({
                        success: false,
                        status: res.statusCode,
                        message: "error creating account Company"
                    });

                 await this.addBranch(res, id, location, next);
    
            }
            else
                return res.json({
                    success: false,
                    status: res.statusCode,
                    message: "The Company already exists",
                    data: company
                })

        }
        catch (error) {
            next(error)
        }
    }

    async addBranch(res: Response<BaseResponse>, id: number, location: string, next: NextFunction) {
        try {
            const company = await Company.findByPk(id);
            if (!company)
                return res.json({
                    success: false,
                    status: res.statusCode,
                    message: "the company does not exist"
                })

            const branchRecord = await CompanyBranch.findOne({
                where: { location, companyId:id },
            });

            if (branchRecord)
                return res.json({
                    success: false,
                    status: res.statusCode,
                    message: "Company and its Branch already exists",
                    data: company
                });

            const branch = await CompanyBranch.create({
                location,
                companyId:id,
            });

            if (!branch)
                return res.json({
                    success: false,
                    status: res.statusCode,
                    message: "error adding Branch"
                });

            return res.json({
                success: true,
                status: res.statusCode,
                message: "success adding new branch/company",
                data: {
                    companyID: company.id,
                    companyName: company.name,
                    location: branch.location
                }
            });
        }
        catch (error) {
            next(error)
        }
    }

    async handleAddBranch(req: CompanyRequestBody, res: Response, next: NextFunction) {
        const { id, location } = req.body;

        await this.addBranch(res, id, location, next);
    }

    async getCompanies(req: Request, res: Response<BaseResponse>, next: NextFunction) {
        try {
            const companies = await Company.findAll({ attributes: ['id', 'name'] });
            return res.json({
                success: true,
                status: res.statusCode,
                message: "success retrieve all companies",
                data: companies
            });
        }
        catch (err) {
            next(err);
        }
    }

    async getBranches(req: BranchRequestBody, res: Response<BaseResponse>, next: NextFunction) {
        try {
            const companyId = req.body.companyId;
            console.log(companyId);
            const locations = await CompanyBranch.findAll({
                where: { companyId },
                attributes: ['id', 'location']
            });
            return res.json({
                success: true,
                status: res.statusCode,
                message: "success retrieve all branches",
                data: locations
            });
        } catch (err) {
            next(err);
        }
    }
}

export default new CompanyController();