import { Request, response, Response } from "express";
import crypto from "crypto";
import user from "../models/user";
import userController from "./userController";
import company from "../models/company";
import CompanyBranch from "@models/companyBranch";
class companyController {
  constructor() {
    this.addCompany = this.addCompany.bind(this);
    this.generateAccount = this.generateAccount.bind(this);
    this.addBranch = this.addBranch.bind(this);
  }
  async addCompany(req: Request, res: Response) {
    const companyId: number = req.body.companyId;
    const companyName: string = req.body.companyName;
    const email: string = req.body.email;
    const location: string = req.body.location;

    const comp = await company.findByPk(companyId);

      if (!comp) {
      const id = await this.generateAccount(res, companyName, email, location);
      if (!id) 
      return res.json({ msg: "error creating account User" });
    
     const record = await company.create({
      companyId: companyId,
      companyName,
      phoneNumber: req.body.phoneNumber,
      location,
      managerName: req.body.managerName,
      id,
    });
    if (!record) 
    return res.json({ msg: "error creating account Company" });
    }
  const BranchName=await this.addBranch(res,companyId,location)
  if (!BranchName)
  return res.json({ msg: "error creating Branch" });
  
  return res.json({ msg: "success" })
}

  async generateAccount(
    res: Response,
    companyName: string,
    email: string,
    location: string
  ) {
    const first = companyName.split(" ")[0].toLocaleLowerCase();
    console.log(companyName.split(" "));
    const second = location.slice(0, 2).toLocaleLowerCase();
    const password = crypto.randomBytes(8).toString("hex"); //random string for password
    const username = first + "." + second;
    var suffix = 1;
    var record = await user.findOne({ where: { username } });
    var temp = username;
    if (record) {
      while (record) {
        temp = username + suffix;
        record = await user.findOne({ where: { username: temp } });
        suffix++;
      }
    }
    const id = await userController.addUser(res, temp, password, email, 2, 6);
    return id as number;
  }

  async addBranch(res: Response,companyId:number,location:string) {
    const Branch =await CompanyBranch.findOne({ where: {location, companyId } });
    if(Branch)
    return res.json({ msg: "Company already exists" });

    const BranchName = await CompanyBranch.create({
      location,
      companyId
    })
    return BranchName
   
}
}
export default new companyController();
