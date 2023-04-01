import { Request, response, Response } from 'express';
import crypto from 'crypto';
import  user from '../models/user';
import userController from './userController';
import company from '../models/company';

class companyController{
    constructor(){
        this.addCompany=this.addCompany.bind(this);
        this.generateAccount=this.generateAccount.bind(this);
    }
    async addCompany (req: Request, res: Response) {
        const companyId:number=req.body.companyId;
        const  companyName:string = req.body.companyName;
        const  email:string = req.body.email;
        const  location:string = req.body.location;

        const id= await this.generateAccount(res, companyName, email, location)
        if(!id)
        res.json({msg:"error creating account User"})

        const record = await company.create({
            companyId:companyId,
            companyName,
            phoneNumber: req.body.phoneNumber,
            location,
            managerName: req.body.managerName, 
            id
          });
          if(!record)
          res.json({msg:"error creating account Company"})
          res.json({msg:"success creating account Company"})
        }

    async generateAccount (res: Response,companyName: string,email: string,location: string) { 
        const first=companyName.split(' ')[0].toLocaleLowerCase();
        console.log(companyName.split(' '))
        const second=location.slice(0,2).toLocaleLowerCase();
        const password = crypto.randomBytes(8).toString('hex'); //random string for password
        const username=first+'.'+second;
        var suffix=1;
        var record = await user.findOne({ where: { username } });
        var temp=username;
        console.log("------------------------------------------");
        console.log(record);
        if(record){
            while(record){
            temp=username+suffix;
            record = await user.findOne({ where: { username:temp } });
            suffix++;
        }
        }
        console.log("------------------------------------------");
        console.log(temp);
        const id=await userController.addUser(res,temp,password,email,2,6);
        return id as number;
    }

}
export default new companyController();