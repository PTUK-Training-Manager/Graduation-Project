import { Request, Response } from 'express';
import  {User} from '../model/user';
import bcrypt from 'bcrypt'
  class UserController{
    async addUser (req: Request, res: Response) {
        try {
			const {username,password,email,roleId} = req.body 
			//const record = await User.create({ ...req.body}); 
			const saltRounds=10;
			const hashedPwd = await bcrypt.hash(password, saltRounds);
      		const record = await User.create({username:username,
				                             password:hashedPwd,
			                                 email:email,
			                                 roleId:roleId});
			return res.json({ msg: "Successfully create User" });
		} catch (e) {
			return res.json(e);
		}
	}
	
	async getAll(req: Request, res: Response) {
		try {
			const records = await User.findAll({});
			return res.json(records);
		} catch (e) {
			return res.json({ msg: "fail to read", status: 500, route: "/read" });
		}
	}

	async DeleteUserByPK(req: Request, res: Response) {
		try {
			let{username}=req.params;
			const deletedUser = await User.destroy({
				where:{ username: username}});
				if(!deletedUser)
				return res.json("something went wrong");
			return res.json("success");
			
		} catch (e) {
			return res.json({ msg: "fail to read", status: 500, route: "/read" });
		}
	}

}

export default new UserController();