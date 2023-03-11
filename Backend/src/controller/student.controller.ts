import { Request, Response } from "express";
import {Student} from '../model/student';

class studentController{
    async addStudent(req: Request, res: Response) {
		try {
			const record = await Student.create({ ...req.body});
			return res.json({ record, msg: "Successfully create student" });
		} catch (e) {
			return res.json({ msg: "fail to create", status: 500, route: "/create" });
		}
	}

    async getAll(req: Request, res: Response) {
		try {
			const records = await Student.findAll({});
			return res.json(records);
		} catch (e) {
			return res.json({ msg: "fail to read", status: 500, route: "/read" });
		}
	}
}

export default new studentController();