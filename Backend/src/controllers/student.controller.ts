import {Request, Response} from "express";
import {Student} from '../models';

interface StudentRequestBody extends Request {
    body: {
        id: string;
        name: string;
        phoneNumber: string;
        userId: number;
    }
}

class studentController {
    async addStudent(req: StudentRequestBody, res: Response) {
        try {
            const {id, name, phoneNumber, userId} = req.body;
            const record = await Student.create({id, name, phoneNumber, userId});
            return res.json({record, msg: "Successfully create student"});
        } catch (e) {
            return res.json(e);
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const records = await Student.findAll({});
            return res.json(records);
        } catch (e) {
            return res.json({msg: "fail to read", status: 500, route: "/read"});
        }
    }

    async DeleteStudentById(req: Request, res: Response) {
        try {
            let {id} = req.params;
            // const record = await Student.findByPk(id);
            const deletedStudent = await Student.destroy({
                where: {id}
            });
            if (!deletedStudent)
                return res.json("something went wrong");
            return res.json("success");

        } catch (e) {
            return res.json({msg: "fail to read", status: 500, route: "/read"});
        }
    }
}


export default new studentController();