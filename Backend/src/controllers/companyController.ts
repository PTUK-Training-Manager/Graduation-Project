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

        const comp = await company.findByPk(companyId);

        if (!comp) {
            const id: number = await userController.generateAccount(
                companyName,
                location,
                email
            );
            if (!id) return res.json({ msg: "error creating account User" });

            const record = await company.create({
                companyId: companyId,
                companyName,
                phoneNumber: req.body.phoneNumber,
                managerName: req.body.managerName,
                userId: id,
            });

            if (!record) return res.json({ msg: "error creating account Company" });
        }
        await this.addBranch(res, companyId, location);
    }

    private async addBranch(res: Response, companyId: number, location: string) {
        const Branch = await CompanyBranch.findOne({
            where: { location, companyId },
        });

        if (Branch)
            return res.json({ msg: "Company and its Branch already exists" });

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
