import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import  {User} from '../model/user'
import { Secret } from 'jsonwebtoken';
import { Role } from '../model/role';

class authController{
    async handleLogin (req: Request, res: Response) {
      try {
    const user = {...req.body};


    const record = await User.findByPk(user.username
       ,{ include: Role}
      );
    console.log(user);
    const roleid=((record as any).RoleId)

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
      // const refreshtoken=process.env.REFRESH_TOKEN_SECRET?.toString() as Secret;
      const accessToken = jwt.sign({
        "UserInfo": {
          username:record.username,
          roleid: roleid
      }}, 
      accesstoken, { expiresIn: '1h' } );
      // const refreshToken = jwt.sign({username: record.username },refreshtoken, { expiresIn: '1d' } );

    // console.log(refreshToken);
    return res.json(accessToken);
    //ضايل نسيف التوكين في اللوكال ستوريج او مكان يعني

    
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