import { NextFunction, Request, Response } from "express";
import UserController from "./UserController";
import Company from "../models/Company";
import CompanyBranch from "../models/CompanyBranch";
import { BranchRequestBody, CompanyRequestBody, GeneratedResponse } from "../types";


class CompanyController {

    async addCompany(req: CompanyRequestBody, res: Response, next: NextFunction) {
        try {
            const { id, name, email, location, phoneNumber, managerName } = req.body;

            const company = await Company.findByPk(id);

            if (!company) {
                const { temp, password } = await UserController.generateAccount(
                    name,
                    location
                );

                const user = await UserController.addUser({
                    username: temp, password, email, saltRounds: 10, roleId: 6
                }); // company roleID in DataBase

                const record = await Company.create({
                    id,
                    name: name,
                    phoneNumber,
                    managerName,
                    userId: user,
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
                    stack: company
                })

        }
        catch (error) {
            next(error)
        }
    }

    private async addBranch(res: Response, companyId: number, location: string, next: NextFunction) {
        try {
            const company = await Company.findByPk(companyId);
            if (!company)
                return res.json({
                    success: false,
                    status: res.statusCode,
                    message: "the company does not exist"
                })

            const branch = await CompanyBranch.findOne({
                where: { location, companyId },
            });

            if (branch)
                return res.json({
                    success: false,
                    status: res.statusCode,
                    message: "Company and its Branch already exists",
                    stack: company
                });

            const BranchName = await CompanyBranch.create({
                location,
                companyId,
            });

            if (!BranchName)
                return res.json({
                    success: false,
                    status: res.statusCode,
                    message: "error adding Branch"
                });

            return res.json({
                success: false,
                status: res.statusCode,
                message: "success adding new branch/company",
                stack: {
                    companyID: company.id,
                    companyName: company.name,
                    location: BranchName.location
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

    async getCompanies(req: Request, res: Response, next: NextFunction) {
        try {
            const companies = await Company.findAll({ attributes: ['id', 'name'] });
            return res.json({
                success: true,
                status: res.statusCode,
                message: "success retrieve all companies",
                stack: companies
            });
        }
        catch (err) {
            next(err);
        }
    }

    async getBranches(req: BranchRequestBody, res: Response, next: NextFunction) {
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
                stack: locations
            });
        } catch (err) {
            next(err);
        }
    }


}

export default new CompanyController();