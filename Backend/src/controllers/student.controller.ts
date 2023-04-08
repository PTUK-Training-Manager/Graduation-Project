import { Request, Response ,Express} from "express";
import Student  from "@models/student";
import UserController from "./userController";

class StudentController {
	constructor() {
		this.addStudent=this.addStudent.bind(this); 
		this.getAll=this.getAll.bind(this);
	}
	
	async addStudent(req: ExpressStudent.Request, res: Response) {
		const { studentId, studentName, email, phoneNumber } = req.body;
	
		const student = await Student.findByPk(studentId);

		if (!student) {
			const { temp, password } = await UserController.generateAccount(
				studentName,
				studentId
			);
			if (!temp) return res.json({ msg: "error creating account User" });
			const id = await UserController.addUser(temp, password, email, 10, 6); // company roleID in DataBase
			if (!id) return res.json({ msg: "error creating account User" });

			const record = await Student.create({
				studentId,
				studentName,
				phoneNumber,
				userId: id,
			});

			if (!record) return res.json({ msg: "error creating account Company" });
			return res.json({ msg: "success adding student" });
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

	async deleteStudentById(req: Request, res: Response) {
		try {
			let { id } = req.params;
			// const record = await Student.findByPk(id);
			const deletedStudent = await Student.destroy({
				where: { studentId: id },
			});
			if (!deletedStudent) return res.json("something went wrong");
			return res.json("success");
		} catch (e) {
			return res.json({ msg: "fail to read", status: 500, route: "/read" });
		}
	}
}

export default new StudentController();
