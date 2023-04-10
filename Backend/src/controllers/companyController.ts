import { Request, Response } from "express";
import UserController from "./userController";
import Company from "@models/Company";
import CompanyBranch from "@models/CompanyBranch";

class CompanyController {
    constructor() {
        this.addCompany = this.addCompany.bind(this);
        this.addBranch = this.addBranch.bind(this);
        this.handleAddBranch = this.handleAddBranch.bind(this);
    }

    async addCompany(req: ExpressCompany.Request, res: Response) {
        const {companyId,companyName,email,location,phoneNumber,managerName}= req.body;

        const company = await Company.findByPk(companyId);

        if (!company) {
            const { temp, password } = await UserController.generateAccount(
                companyName,
                location
            );
            if (!temp) return res.json({ msg: "error creating account User" });
            const id = await UserController.addUser(temp, password, email, 10, 6); // company roleID in DataBase
            if (!id) return res.json({ msg: "error creating account User" });

            
            const record = await Company.create({
                id: companyId,
                name:companyName,
                phoneNumber,
                managerName,
                userId: id,
            });

            if (!record) return res.json({ msg: "error creating account Company" });
        }

        await this.addBranch(res, companyId, location);
    }

    private async addBranch(res: Response, companyId: number, location: string) {
        const company = await Company.findByPk(companyId);

        if (!company)
            return res.json({ msg: "the company does not exist" })
        
        const branch = await CompanyBranch.findOne({
            where: { location, companyId },
        });

        if (branch)
            return res.json({ msg: "Company and its Branch already exists" });

        const BranchName = await CompanyBranch.create({
            location,
            companyId,
        });

        if (!BranchName) return res.json({ msg: "error creating Branch" });
        return res.json({ msg: "success adding new branch/company" });
    }

    async handleAddBranch(req: ExpressBranch.Request, res: Response) {
        const {companyId,location}= req.body;
        
        await this.addBranch(res, companyId, location);
    }
}

export default new CompanyController();
