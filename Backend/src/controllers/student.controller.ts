import { Request, Response } from "express";
import { Student } from '../models';
import userController from "./userController";

class studentController {
	// async addStudent(req: Request, res: Response) {
	// 	try {
	// 		const record = await Student.create({ ...req.body });
	// 		return res.json({ record, msg: "Successfully create student" });
	// 	} catch (e) {
	// 		return res.json(e);
	// 	}
	// }
	async addStudent(req: Request, res: Response) {
		const studentId: string = req.body.studentId;
        const studentName: string = req.body.studentName;
        const email: string = req.body.email;
        const phoneNumber: string = req.body.phoneNumber;
		
		const student = await Student.findByPk(studentId);

        if (!student) {
            const id: number = await userController.generateAccount(
                studentName,
                phoneNumber,
                email
            );
            if (!id) return res.json({ msg: "error creating account User" });

			
			const record = await Student.create({
                studentId,
                studentName,
                phoneNumber,
                userId: id,
            });

            if (!record) return res.json({ msg: "error creating account Company" });
			return res.json({ msg: "success adding student"});
		}
		return res.json({ msg: "student already exists" });
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
			let { id } = req.params;
			// const record = await Student.findByPk(id);
			const deletedStudent = await Student.destroy({
				where: { studentId: id }
			});
			if (!deletedStudent)
				return res.json("something went wrong");
			return res.json("success");

		} catch (e) {
			return res.json({ msg: "fail to read", status: 500, route: "/read" });
		}
	}
}


export default new studentController();