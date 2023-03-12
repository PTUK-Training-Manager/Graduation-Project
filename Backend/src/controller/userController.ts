import { Request, Response } from 'express';
import  {User} from '../model/user'
  class UserController{
    async addUser (req: Request, res: Response) {
        try {
			const record = await User.create({ ...req.body});
			return res.json({ record, msg: "Successfully create User" });
		} catch (e) {
			return res.json(e);
		}
	}
}

export default new UserController();