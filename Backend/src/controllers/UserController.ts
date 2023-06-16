import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Secret } from "jsonwebtoken";
import { AddedUser, BaseResponse } from "../types";
import { sendEmail } from "../services/email";
import { isProduction } from "../utils";
import { UserRoleEnum } from "../enums";

class UserController {
  constructor() {
    this.generateAccount = this.generateAccount.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
    this.addUser = this.addUser.bind(this);
    // this.sendEmail = this.sendEmail.bind(this);
  }

  async addUser(user: AddedUser) {
    const { username, password, email, saltRounds, roleId, name } = user;
    const text = `Hello! this is a message from PTUK training system.
                      theses login credentials for your account on the PTUK training system, which you can use to access our platform 
                      username: ${username} 
                      password: ${password}
                      Please note that your password is confidential and should not be shared with anyone.`;
    const subject = "login credentials";
    sendEmail(email, subject, text);
    const hashedPwd = await bcrypt.hash(password, saltRounds);
    const record = await User.create({
      username,
      password: hashedPwd,
      email,
      roleId,
      name
    });
    return record.id as number;
  }

  async generateAccount(
    firstValue: string,
    secondValue: string
  ): Promise<{ temp: string; password: string }> {
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

    async handleAddUser(
    req: Request<unknown,unknown,{name:string, email:string}>,
    res: Response<BaseResponse>,
    next: NextFunction
  ){
    try {
      const { name, email } = req.body;
      const saltRounds = 10;
      const {temp, password} = await this.generateAccount('ptuk',name);
      const id = await this.addUser({
        username:temp,
        password,
        email,
        saltRounds,
        roleId:UserRoleEnum.UNI_TRAINING_OFFICER,
        name
      });
      if (id)
        return res.json({
          success: true,
          status: res.statusCode,
          message: "Successfully create Faculty",
          data: id,
        });
    } catch (err) {
      next(err);
    }
  }

  async getAll(
    req: Request<{ start: string; limit: string }>,
    res: Response<BaseResponse>,
    next: NextFunction
  ) {
    try {
      const records = await User.findAll();

      const { start, limit } = req.params;
      const parsedStart = parseInt(start, 10);
      const parsedLimit = parseInt(limit, 10);
      const paginatedData = records.slice(
        parsedStart,
        parsedStart + parsedLimit
      );
      return res.json({
        success: true,
        status: res.statusCode,
        message: "Users:",
        data: paginatedData,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteUserByPK(req: Request, res: Response) {
    try {
      let { username } = req.params;
      const deletedUser = await User.destroy({
        where: { username },
      });
      if (!deletedUser) return res.json("something went wrong");
      return res.json("success");
    } catch (e) {
      return res.json({ msg: "fail to read", status: 500, route: "/read" });
    }
  }

  sendResetPassword = async (
    req: Request,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    try {
      const { username } = req.body;
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.json({
          success: false,
          status: res.statusCode,
          message: "invalid username",
        });
      } else {
        const resetTokenSecret = <Secret>process.env.RESET_TOKEN_SECRET;

        const payload = {
          userId: user.id,
          username: user.username,
          roleId: user.roleId,
        };

        const resetToken = jwt.sign(payload, resetTokenSecret, {
          expiresIn: "1d",
        });

        res.status(202).cookie("reset-token", resetToken, {
          maxAge: 60 * 60 * 24 * 1000, // = 1 day in milliseconds
          httpOnly: true,
          secure: true, // limits the scope of the cookie to "secure" channels.
          sameSite: "none",
          domain: isProduction ? ".onrender.com" : "localhost",
        });
        const message = `
                <a href="http://localhost:3500/forget-password"> reset password </a> 
                `;
        sendEmail(user.email, "Forget Password", message);

        return res.json({
          success: true,
          status: res.statusCode,
          message: "a Link sent successfully to ur email to reset ur password",
          data: resetToken,
        });
      }
    } catch (err) {
      next(err);
    }
  };
  enterData = async (
    req: Request,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    return res.json({
      success: true,
      status: res.statusCode,
      message: "Enter Data",
    });
  };

  resetForgottenPassword = async (
    req: Request,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    const { newPassword, confirmNewPassword } = req.body;

    if (newPassword != confirmNewPassword)
      return res.json({
        success: false,
        status: res.statusCode,
        message: "Passwords are not matched",
      });

    const hash = await bcrypt.hash(newPassword, 10);
    const user = await User.findOne({ where: { username: req.user.username } });
    await User.update(
      { password: hash },
      { where: { username: user?.username } }
    );

    return res.json({
      success: true,
      status: res.statusCode,
      message: "password updated successfully",
      data: newPassword,
    });
  };

  resetPassword = async (
    req: Request,
    res: Response<BaseResponse>,
    next: NextFunction
  ) => {
    try {
      const { oldPassword, newPassword, confirmNewPassword } = req.body;

      const username = req.user.username;
      const user = await User.findOne({
        where: { username },
      });

      if (user) {
        const isCorrect = await bcrypt.compare(oldPassword, user?.password);
        if (isCorrect) {
          if (newPassword != confirmNewPassword)
            return res.json({
              success: false,
              status: res.statusCode,
              message: "Passwords are not matched",
            });
          const hash = await bcrypt.hash(newPassword, 10);
          await User.update({ password: hash }, { where: { id: user?.id } });

          return res.json({
            success: true,
            status: res.statusCode,
            message: "password updated successfully",
            data: newPassword,
          });
        } else {
          return res.json({
            success: false,
            status: res.statusCode,
            message: "password is incorrect",
          });
        }
      }
    } catch (err) {
      next(err);
    }
  };
}
export default new UserController();