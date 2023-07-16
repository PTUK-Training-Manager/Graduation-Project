import { NextFunction, Request, Response } from "express";
import { Student } from "../models";
import UserController from "./UserController";
import { BaseResponse, StudentRequestBody } from "../types";
import { UserRoleEnum } from "../enums";
import {
  Company,
  CompanyBranch,
  User,
  Trainer,
  Training,
} from "../models/index";

class studentController {
  async addStudent(
    req: StudentRequestBody,
    res: Response<BaseResponse>,
    next: NextFunction
  ) {
    try {
      const { id, name, email, phoneNumber, department } = req.body;
      let nameArray = name.split(" ");
      const firstName = nameArray[0]; // Get the first section
      const lastName = nameArray[nameArray.length - 1];
      const student = await Student.findByPk(id);

      if (student) {
        return id;
      }

      const { temp, password } = await UserController.generateAccount(
        firstName,
        lastName
      );

      const user = await UserController.addUser({
        username: temp,
        email,
        password,
        saltRounds: 10,
        roleId: UserRoleEnum.STUDENT,
        name,
      }); // company roleID in DataBase

      const studentRecord = await Student.create({
        id,
        name,
        phoneNumber,
        userId: user,
        department,
      });

      if (studentRecord) {
        return "ok";
      }
    } catch (err) {
      next(err);
    }
  }

  // async getAll(
  //   req: Request<{ start: string; limit: string }>,
  //   res: Response<BaseResponse>,
  //   next: NextFunction
  // ) {
  //   try {
  //     const records = await Student.findAll({});

  //     const { start, limit } = req.params;
  //     const parsedStart = parseInt(start, 10);
  //     const parsedLimit = parseInt(limit, 10);
  //     const paginatedData = records.slice(
  //       parsedStart,
  //       parsedStart + parsedLimit
  //     );

  //     return res.json({
  //       success: true,
  //       status: res.statusCode,
  //       message: "Student: ",
  //       data: paginatedData,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  // async deleteStudentById(req: Request, res: Response) {
  //   try {
  //     let { id } = req.params;
  //     // const record = await Student.findByPk(id);
  //     const deletedStudent = await Student.destroy({
  //       where: { id },
  //     });
  //     if (!deletedStudent) return res.json("something went wrong");
  //     return res.json("success");
  //   } catch (e) {
  //     return res.json({ msg: "fail to read", status: 500, route: "/read" });
  //   }
  // }
}

export default new studentController();