import { NextFunction, Request, Response } from "express";
import { Student, Training } from '../models';
import UserController from "./UserController";
import { GeneratedResponse } from "src/types";
import { TrainingStatusEnum } from "src/enums";
interface StudentRequestBody extends Request {
    body: {
        id: string;
        name: string;
        phoneNumber: string;
        email: string;
        userId: number;
    }
}

class studentController {
    constructor() {
        this.addStudent = this.addStudent.bind(this);
        this.getAll = this.getAll.bind(this);
    }

    async addStudent(req: StudentRequestBody, res: Response, next: NextFunction) {
        try {
            const { id, name, email, phoneNumber } = req.body;

            const student = await Student.findByPk(id);

            if (!student) {
                const { temp, password } = await UserController.generateAccount(
                    name,
                    phoneNumber,

                );
                const user = await UserController.addUser(temp, password, email, 10, 6); // company roleID in DataBase

                const record = await Student.create({
                    id,
                    name: name,
                    phoneNumber,
                    userId: user,
                });

                if (!record) {
                    let response: GeneratedResponse = {
                        success: false,
                        status: res.statusCode,
                        message: "error creating Student account"
                    }
                    return res.json(response);
                }
                {
                    let response: GeneratedResponse = {
                        success: true,
                        status: res.statusCode,
                        message: "success adding student",
                        data: record
                    }
                    return res.json(response);
                }
            }
            let response: GeneratedResponse = {
                success: false,
                status: res.statusCode,
                message: "student already exists",
                data: student
            }
            return res.json(response);
        }
        catch (err) {
            next(err);
        }
    }

    async getAll(req: Request, res: Response,next: NextFunction) {
        try {
            const records = await Student.findAll({});
            let response: GeneratedResponse = {
                success: true,
                status: res.statusCode,
                message:"Student: ",
                data: records
            }
            return res.json(response);
        } catch (err) {
            next(err);
        }
    }


    



    // async deleteStudentById(req: Request, res: Response) {
    //     try {
    //         let { id } = req.params;
    //         // const record = await Student.findByPk(id);
    //         const deletedStudent = await Student.destroy({
    //             where: { id: id },
    //         });
    //         if (!deletedStudent) return res.json("something went wrong");
    //         return res.json("success");
    //     } catch (e) {
    //         return res.json({ msg: "fail to read", status: 500, route: "/read" });
    //     }
    // }
}

export default new studentController();