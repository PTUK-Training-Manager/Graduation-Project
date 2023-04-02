import { Request, Response } from "express";
import { User } from "../models";
import bcrypt from "bcrypt";
import crypto from "crypto";

class UserController {
    constructor() {
        this.addUser = this.addUser.bind(this);
        this.generateAccount = this.generateAccount.bind(this);
        this.handleAddUser = this.handleAddUser.bind(this);
    }


//making two separate functions for one purpose (I can merge them into one function as 
//long as the generate account function does not depend on the add user function (not waiting 
//for certain value to complete the work))
    async addUser(
        username: string,
        password: string,
        email: string,
        saltRounds: number,
        roleId: number
    ) {
        const hashedPwd = await bcrypt.hash(password, saltRounds);
        const record = await User.create({
            username,
            password: hashedPwd,
            email,
            roleId,
        });
        return record.id as number;
    }
    
    async generateAccount(First: string, Second: string, email: string,roleId: number){
        const first = First.split(" ")[0].toLocaleLowerCase();
        const second = Second.slice(0, 2).toLocaleLowerCase();

        const password = crypto.randomBytes(8).toString("hex"); //random string for password
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
        const id = await this.addUser(temp, password, email, 10, roleId);
        return id as number;
    }

    async handleAddUser(req: Request, res: Response) { // I think we should cancel this request!, not completely finished
        try {
            const { username, email, password, roleId } = req.body;
            const saltRounds = 10;
            const id = await this.addUser(
                username,
                password,
                email,
                saltRounds,
                roleId
            );
            if (id) return res.json({ msg: "Successfully create User" });
        } catch (e) {
            return res.json(e);
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const records = await User.findAll({});
            return res.json(records);
        } catch (e) {
            return res.json({ msg: "fail to read", status: 500, route: "/read" });
        }
    }

    async DeleteUserByPK(req: Request, res: Response) {
        try {
            let { username } = req.params;
            const deletedUser = await User.destroy({
                where: { username: username },
            });
            if (!deletedUser) return res.json("something went wrong");
            return res.json("success");
        } catch (e) {
            return res.json({ msg: "fail to read", status: 500, route: "/read" });
        }
    }
}

export default new UserController();
