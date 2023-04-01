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

        const userName= await this.generateAccount(res, companyName, email, location)
       // const userName = "s.a.amer";
        const record = await company.create({
            companyId:companyId,
            companyName,
            phoneNumber: req.body.phoneNumber,
            location,
            managerName: req.body.managerName,
            userName 
          });
          console.log(record);
        }

    async generateAccount (res: Response,companyName: string,email: string,location: string) { 
        const first=companyName.split(' ')[0].toLocaleLowerCase();
        console.log(companyName.split(' '))
        const second=location.slice(0,2).toLocaleLowerCase();
        const password = crypto.randomBytes(8).toString('hex'); //random string for password
        const username=first+'.'+second;
        var suffix=1;
        var record = await user.findByPk(username);
        var temp=username;
        if(record){
            while(record){
            temp=username+suffix;
            record = await user.findByPk(temp);
            suffix++;
        }
        }
        await userController.addUser(res,username,password,email,2,6);
        return temp;
 
    }

}
export default new companyController();