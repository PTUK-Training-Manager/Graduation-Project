import { Request, Response } from "express";
import {Student} from '../model/student';

class studentController{
    async addStudent(req: Request, res: Response) {
		try {
			const record = await Student.create({ ...req.body});
			return res.json({ record, msg: "Successfully create student" });
		} catch (e) {
			return res.json(e);
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

	async DeleteStudentById(req: Request, res: Response) {
		try {
			let{id}=req.params;
			// const record = await Student.findByPk(id);
			const deletedStudent = await Student.destroy({
				where:{ studentId: id}});
				if(!deletedStudent)
				return res.json("something went wrong");
			return res.json("success");
			
		} catch (e) {
			return res.json({ msg: "fail to read", status: 500, route: "/read" });
		}
	}
}

    
export default new studentController();