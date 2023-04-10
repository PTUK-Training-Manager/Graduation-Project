import { Request, Response } from "express";
import UserController from "./UserController";
import Company from "@models/Company";
import CompanyBranch from "@models/CompanyBranch";

interface CompanyRequestBody extends Request {
    body: {
        id: number;
        name: string;
        phoneNumber: string;
        email: string;
        location: string;
        managerName: string;
    }
}
class CompanyController {
    constructor() {
        this.addCompany = this.addCompany.bind(this);
        this.addBranch = this.addBranch.bind(this);
        this.handleAddBranch = this.handleAddBranch.bind(this);
    }

    async addCompany(req: CompanyRequestBody, res: Response) {
        const { id, name, email, location, phoneNumber, managerName } = req.body;

        const company = await Company.findByPk(id);

        if (!company) {
            const { temp, password } = await UserController.generateAccount(
                name,
                location
            );
            if (!temp) return res.json({ msg: "error creating account User" });
            const id = await UserController.addUser(temp, password, email, 10, 6); // company roleID in DataBase
            if (!id) return res.json({ msg: "error creating account User" });


            const record = await Company.create({
                id: id,
                name: name,
                phoneNumber,
                managerName,
                userId: id,
            });

            if (!record) return res.json({ msg: "error creating account Company" });
        }

        await this.addBranch(res, id, location);
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

    async handleAddBranch(req: CompanyRequestBody, res: Response) {
        const { id, location } = req.body;
        await this.addBranch(res, id, location);
    }
}

export default new CompanyController();
