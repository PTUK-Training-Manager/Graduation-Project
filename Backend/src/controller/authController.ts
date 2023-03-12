// import express from 'express';
import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import  {User} from '../model/user'
import { Secret } from 'jsonwebtoken';

// import dotenv from 'dotenv';
// dotenv.config();
class authController{
    async handleLogin (req: Request, res: Response) {
      try {
    const user = {...req.body};
    const record = await User.findByPk(user.username);
    console.log(user);
    if (!record) 
    return res.json("false");
     else{ 
     //const match = await bcrypt.compare(user.password,record.password);
     const match =(user.password==record.password)
     if (!match) {
         return res.status(401).json({ error: 'Invalid password' });
      }
      else{
      const accesstoken= process.env.ACCESS_TOKEN_SECRET?.toString() as Secret;
      const refreshtoken=process.env.REFRESH_TOKEN_SECRET?.toString() as Secret;
      const accessToken = jwt.sign({username: record.username }, accesstoken, { expiresIn: '1h' });
      const refreshToken = jwt.sign({username: record.username },refreshtoken, { expiresIn: '1d' } );

    console.log(refreshToken);
    return res.json(accessToken);
    // }
  }
}
      }
  catch(error){
    return res.json("erorr");
  }
}
}
export default new authController()