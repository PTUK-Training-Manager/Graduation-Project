import { NextFunction, Request, Response } from "express";
import { BaseResponse, TrainerRequestBody } from "../types";
import { Trainer, Company, User } from "../models";
import UserController from "./UserController";

class TrainierController {

	async addtrainer(req: TrainerRequestBody, res: Response<BaseResponse>, next: NextFunction) {
		try {
			const {name,email, field, username, password}= req.body;

			const user = await User.findOne({
				where: {username}
			})

            if (user) {
                return res.json({
                    success: false,
                    status: res.statusCode,
                    message: "trainer already exists || invalid username",
                    data: user
                })
            }
			const TrainerUserid = await UserController.addUser({
                username,
                email,
                password,
                saltRounds: 10,
                roleId: 3
            }); // Trainer roleID in DataBase



			const Username = req.user.username;
            const companyUser = await User.findOne({
                where: { username:Username },
                attributes: ['id']
            });
            const companyUserId = companyUser?.id;

			const company = await Company.findOne({
                where: { userId:companyUserId },
                attributes: ['id']
            });
            const companyId = company?.id;


		

			const trainerRecord = await Trainer.create({
                name,
                field,
                userId: TrainerUserid,
				companyId
            });

			if(!trainerRecord)
			return res.json({
				success: false,
				status: res.statusCode,
				message: "error creating Trainer account"
			});
		
			return res.json({
				success: true,
				status: res.statusCode,
				message: "Successfully add trainer",
				data: trainerRecord
			});
		} catch (err) {
			next(err);
		}
	}

	async getAll(req: TrainerRequestBody, res: Response<BaseResponse>, next: NextFunction) {
		try {
			const records = await Trainer.findAll({});
			return res.json({
				success: true,
				status: res.statusCode,
				message: "Trainers: ",
				data: records
			});
		} catch (err) {
			next(err);
		}
	}
}

export default new TrainierController();