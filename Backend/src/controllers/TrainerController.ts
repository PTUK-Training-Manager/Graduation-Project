import { NextFunction, Request, Response } from "express";
import { BaseResponse, TrainerRequestBody } from "../types";
import { Trainer, Company, User, Training } from "../models";
import UserController from "./UserController";
import { TrainerStatusEnum, TrainingStatusEnum, UserRoleEnum } from "../enums";
import { Op } from "sequelize";
const { addUser } = UserController
class TrainierController {

	addtrainer = async (req: TrainerRequestBody, res: Response<BaseResponse>, next: NextFunction) => {
		try {
			const { name, email, field, username: trainerUsername, password } = req.body;

			/**
			 * User
			 */

			const user = await User.findOne({
				where: { username: trainerUsername }
			})

			if (user) {
				return res.json({
					success: false,
					status: res.statusCode,
					message: "trainer already exists || invalid username",
					data: user
				})
			}

			const trainerUserId = await addUser({
				username: trainerUsername,
				email,
				password,
				saltRounds: 10,
				roleId: UserRoleEnum.TRAINER
			}); // Trainer roleID in DataBase

			const username = req.user.username;
			const companyUser = await User.findOne({
				where: { username },
				attributes: ['id']
			});
			const companyUserId = companyUser?.id;

			const company = await Company.findOne({
				where: { userId: companyUserId },
				attributes: ['id']
			});
			const companyId = company?.id;

			const trainerRecord = await Trainer.create({
				name,
				field,
				status: TrainerStatusEnum.active,
				userId: trainerUserId,
				companyId
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

	getAll = async (req: TrainerRequestBody, res: Response<BaseResponse>, next: NextFunction) => {
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

	getMyTrainers = async (req: Request, res: Response<BaseResponse>, next: NextFunction) => {

		try {




			const username = req.user.username;
			const companyUser = await User.findOne({
				where: { username: username },
				attributes: ['id']
			});
			const companyUserId = companyUser?.id;

			const company = await Company.findOne({
				where: { userId: companyUserId },
				attributes: ['id']
			});
			const companyId = company?.id;
			console.log(username, companyUserId, companyId)



			const records = await Trainer.findAll({
				where: { companyId }
			});
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

	updateTrainer = async (req: Request<unknown, unknown, { id: number, field: string }>, res: Response<BaseResponse>, next: NextFunction) => {

		const { id, field } = req.body;
		try {

			await Trainer.update({ field },
				{
					where: { id }
				});
			const trainerRecord = await Trainer.findByPk(id)
			if (trainerRecord)
				return res.json({
					success: true,
					status: res.statusCode,
					message: "successfully updated trainers field",
					data: trainerRecord
				})

			return res.json({
				success: false,
				status: res.statusCode,
				message: "something went wrong"
			})
		} catch (err) {
			next(err);
		}
	}

	deactivateTrainer = async (req: Request<unknown, unknown, { id: number }>, res: Response<BaseResponse>, next: NextFunction) => {
		try {
			const id = req.body;
			const trainingRecords = await Training.findAll({
				where: {
					[Op.and]: {
						trainerId: id,
						status: TrainingStatusEnum.running
					}
				}
			})
			if (trainingRecords)
				return res.json({
					success: false,
					status: res.statusCode,
					message: "Trainer linked with trainees, can't be deactivated",
					data: trainingRecords
				})
			await Trainer.update({ status: TrainerStatusEnum.inactive },
				{
					where: { id }
				});
			const trainerRecord = await Trainer.findByPk(+id)
			if (trainerRecord)
				return res.json({
					success: true,
					status: res.statusCode,
					message: "successfully disabled trainer",
					data: trainerRecord,
				})
			return res.json({
				success: false,
				status: res.statusCode,
				message: "something went wrong"
			})
		}
		catch (err) {
			next(err);
		}
	}

}

export default new TrainierController();