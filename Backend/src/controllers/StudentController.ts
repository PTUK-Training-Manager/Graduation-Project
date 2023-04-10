import {Request, Response} from "express";
import {Student} from '../models';
import UserController from "./UserController";
interface StudentRequestBody extends Request {
    body: {
        id: string;
        name: string;
        phoneNumber: string;
        email:string;
        userId: number;
    }
}

class studentController {
    constructor() {
		this.addStudent=this.addStudent.bind(this); 
		this.getAll=this.getAll.bind(this);
	}
	
    async addStudent(req:StudentRequestBody, res: Response) {
		const {id,name, email, phoneNumber } = req.body;
	
		const student = await Student.findByPk(id);

		if (!student) {
			const { temp, password } = await UserController.generateAccount(
				name,
				phoneNumber
			);
			if (!temp) return res.json({ msg: "error creating account User" });
			const user = await UserController.addUser(temp, password, email, 10, 6); // company roleID in DataBase
			if (!user) return res.json({ msg: "error creating account User" });

			const record = await Student.create({
				id,
				name:name,
				phoneNumber,
				userId: user,
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
				where: { id: id },
			});
			if (!deletedStudent) return res.json("something went wrong");
			return res.json("success");
		} catch (e) {
			return res.json({ msg: "fail to read", status: 500, route: "/read" });
		}
	}
}

export default new studentController();