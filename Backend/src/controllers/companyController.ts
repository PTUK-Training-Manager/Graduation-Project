import { Request, response, Response } from "express";

import userController from "./userController";
import company from "../models/company";
import CompanyBranch from "@models/companyBranch";
class companyController {
    constructor() {
        this.addCompany = this.addCompany.bind(this);
        this.addBranch = this.addBranch.bind(this);
        this.handleAddBranch = this.handleAddBranch.bind(this);
    }

    async addCompany(req: Request, res: Response) {
        const companyId: number = req.body.companyId;
        const companyName: string = req.body.companyName;
        const email: string = req.body.email;
        const location: string = req.body.location;

        //checking if company already exists
        const comp = await company.findByPk(companyId);

        //if company does not exist then create user account
        if (!comp) {
            const { temp, password } = await userController.generateAccount(
                companyName,
                location
            );
            if (!temp) return res.json({ msg: "error creating account User" });
            const id = await userController.addUser(temp, password, email, 10, 6); // company roleID in DataBase
            if (!id) return res.json({ msg: "error creating account User" });

            //after creating user account with role (company),
            //create the company account with a foreign key from user (userId)
            const record = await company.create({
                companyId: companyId,
                companyName,
                phoneNumber: req.body.phoneNumber,
                managerName: req.body.managerName,
                userId: id,
            });

            if (!record) return res.json({ msg: "error creating account Company" });
        }

        //the company exists or not and if nothing goes wrong, call add branch function anyway.
        await this.addBranch(res, companyId, location);
    }

    private async addBranch(res: Response, companyId: number, location: string) {
        //check if the company already exists
        const comp = await company.findByPk(companyId);

        //if company does not exist then create user account
        if (!comp)
            return res.json({ msg: "the company does not exist" })
        
            //check if the Branch already exists
        const Branch = await CompanyBranch.findOne({
            where: { location, companyId },
        });

        if (Branch)
            return res.json({ msg: "Company and its Branch already exists" });

        //if the Branch does not exist, create it (without creating new user
        //account taking into consideration that all branches in one comapy have one user account)
        const BranchName = await CompanyBranch.create({
            location,
            companyId,
        });

        if (!BranchName) return res.json({ msg: "error creating Branch" });
        return res.json({ msg: "success adding new branch/company" });
    }

    async handleAddBranch(req: Request, res: Response) {
        const companyId: number = req.body.companyId;
        const location: string = req.body.location;

        await this.addBranch(res, companyId, location);
    }
}

export default new companyController();
