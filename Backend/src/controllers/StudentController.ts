import { NextFunction, Request, Response } from "express";
import { Student } from '../models';
import UserController from "./UserController";
import { BaseResponse, StudentRequestBody } from "../types";


class studentController {

    async addStudent(req: StudentRequestBody, res: Response<BaseResponse>, next: NextFunction) {
        try {
            const { id, name, email, phoneNumber } = req.body;

            const student = await Student.findByPk(id);

            if (student) {
                return res.json({
                    success: false,
                    status: res.statusCode,
                    message: "student already exists",
                    data: student
                })
            }

            const { temp, password } = await UserController.generateAccount(name, phoneNumber);

            const user = await UserController.addUser({
                username: temp,
                email,
                password,
                saltRounds: 10,
                roleId: 3
            }); // company roleID in DataBase

            const studentRecord = await Student.create({
                id,
                name,
                phoneNumber,
                userId: user,
            });

            if (!studentRecord) {
                return res.json({
                    success: false,
                    status: res.statusCode,
                    message: "error creating Student account"
                });
            }

            return res.json({
                success: true,
                status: res.statusCode,
                message: "success adding student",
                data: studentRecord
            });
        } catch (err) {
            next(err);
        }
    }

    async getAll(req: Request, res: Response<BaseResponse>, next: NextFunction) {
        try {
            const records = await Student.findAll({});
            return res.json({
                success: true,
                status: res.statusCode,
                message: "Student: ",
                data: records
            });
        } catch (err) {
            next(err);
        }
    }


    async deleteStudentById(req: Request, res: Response) {
        try {
            let {id} = req.params;
            // const record = await Student.findByPk(id);
            const deletedStudent = await Student.destroy({
                where: { id},
            });
            if (!deletedStudent) return res.json("something went wrong");
            return res.json("success");
        } catch (e) {
            return res.json({ msg: "fail to read", status: 500, route: "/read" });
        }
    }
}

export default new studentController();