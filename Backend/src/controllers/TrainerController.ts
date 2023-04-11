import { NextFunction, Request, Response } from "express";
import Trainer from '../models/Trainer';
import { GeneratedResponse } from "src/types";

class trainierController {
	
	//ما ننساه بده شغل!
	async addtrainer(req: Request, res: Response,next: NextFunction) {
		try {
			const record = await Trainer.create({ ...req.body });
			let response: GeneratedResponse = {
				success: true,
				status: res.statusCode,
				message:"Successfully add trainer",
				data: record
			}
			return res.json(response);
		} catch (err) {
			next(err);
		}
	}

	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const records = await Trainer.findAll({});

			let response: GeneratedResponse = {
				success: true,
				status: res.statusCode,
				message: "Trainers: ",
				data: records
			}
			return res.json(response);
		} catch (err) {
			next(err);
		}
	}
}

export default new trainierController();