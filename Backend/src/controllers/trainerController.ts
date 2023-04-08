import { Request, Response } from "express";
import Trainer from '@models/trainer';

class TrainerController {
	
	
	//same as add student but we need the companyId from the token "to remember"
	async addtrainer(req: Request, res: Response) {
		// try {
		// 	const record = await Trainer.create({ ...req.body });
		// 	return res.json({ record, msg: "Successfully add trainer" });
		// } catch (e) {
		// 	return res.json(e);
		// }
	}

	async getAll(req: Request, res: Response) {
		try {
			const records = await Trainer.findAll({});
			return res.json(records);
		} catch (e) {
			return res.json({ msg: "fail to read", status: 500, route: "/read" });
		}
	}
}

export default new TrainerController();