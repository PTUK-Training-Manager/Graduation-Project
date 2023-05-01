import { NextFunction, Request, Response } from "express";
import { User } from '../models';
import bcrypt from "bcrypt";
import crypto from "crypto";
import { AddedUser, BaseResponse } from "../types";
import nodemailer from "nodemailer";
import { test } from "node:test";

class UserController {
    constructor() {
        this.generateAccount = this.generateAccount.bind(this);
        // this.handleAddUser = this.handleAddUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.sendEmail = this.sendEmail.bind(this);

    }

    async addUser(user: AddedUser) {
        const { username, password, email, saltRounds, roleId } = user;
        this.sendEmail(email, username, password);
        const hashedPwd = await bcrypt.hash(password, saltRounds);
        const record = await User.create({
            username,
            password: hashedPwd,
            email,
            roleId,
        });
        return record.id as number;
    }

    async generateAccount(firstValue: string, secondValue: string): Promise<{ temp: string; password: string; }> {
        const first = firstValue.split(" ")[0].toLocaleLowerCase();
        const second = secondValue.slice(0, 2).toLocaleLowerCase();

        const password = crypto.randomBytes(8).toString("hex"); //random string for password
        console.log(password);
        const username = first + "." + second;
        var suffix = 1;
        var record = await User.findOne({ where: { username } });
        var temp = username;
        if (record) {
            while (record) {
                temp = username + suffix;
                record = await User.findOne({ where: { username: temp } });
                suffix++;
            }
        }

        return { temp, password };
    }

    // async handleAddUser(req: Request, res: Response<BaseResponse>, next: NextFunction) { // I think we should cancel this request!, not completely finished
    //     try {
    //         const { username, email, password, roleId } = req.body;
    //         const saltRounds = 10;
    //         const id = await this.addUser({
    //             username,
    //             password,
    //             email,
    //             saltRounds,
    //             roleId
    //         });
    //         if (id)
    //             return res.json({
    //                 success: true,
    //                 status: res.statusCode,
    //                 message: "Successfully create User",
    //                 data: id
    //             });
    //     } catch (err) {
    //         next(err);
    //     }
    // }

    async getAll(req: Request, res: Response<BaseResponse>, next: NextFunction) {
        try {
            const records = await User.findAll();
            return res.json({
                success: true,
                status: res.statusCode,
                message: "Users:",
                data: records
            });
        } catch (err) {
            next(err);
        }
    }

    // async deleteUserByPK(req: Request, res: Response) {
    //     try {
    //         let { username } = req.params;
    //         const deletedUser = await User.destroy({
    //             where: { username },
    //         });
    //         if (!deletedUser) return res.json("something went wrong");
    //         return res.json("success");
    //     } catch (e) {
    //         return res.json({ msg: "fail to read", status: 500, route: "/read" });
    //     }
    // }

    sendEmail = (email: string, username: string, password: string) => {
        const text = `Hello! this is a message from PTUK training system.
                      theses login credentials for your account on the PTUK training system, which you can use to access our platform 
                      username: ${username} 
                      password: ${password}
                      Please note that your password is confidential and should not be shared with anyone.`
        const user = 'trainingsytem11@gmail.com';
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: user,
                pass: 'stqmwejhkhufabpw'
            } 
        });
        const mailOptions = {
            from: user,
            to: email,
            subject: 'username and password',
            text: text
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    }

//     const sendCode = async(req:Request,res:Response)=>{
//         const {email}=req.body;
//         const user = await User.findOne({ where: { email }, attributes: ['email'] }); //just email
//         if(!user){
//             res.json({message:"invalid gmail"})
//         }
//         else{
//             const code=nanoid();
//             await sendEmail(email,'Forget Password',`verify code: ${code}`);
            
//             const updateUser = await userModel.updateOne({_id:user._id},{sendCode:code});
//             if(!updateUser){
//                 res.json({message:"invalid"});
//             }
//             else{
//                 res.json({message:"success"});
//             }
//         }
    
//     }
    
//     const forgetPassword = async(req,res)=>{
//         const{code,email,newPassword}= req.body;
    
//         if(code==null){
//             res.json({message:"fail"});
//         }
//         else{
//         const hash= await bcrypt.hash(newPassword,parseInt(process.env.NUMCrypt));
//         const user = await userModel.findOneAndUpdate({email,sendCode:code},{password:hash, sendCode:null});
//         if(!user){
//             res.json({message:"fail"});
//         }
//         else{
//             res.json({message:"success"});
//         }
//         }
// }
}
export default new UserController();

