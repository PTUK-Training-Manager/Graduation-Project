import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User } from '../model/user'
import { Secret } from 'jsonwebtoken';
import { Role } from '../model/role';

class AuthController {
  handleLogin=  async (req: Request, res: Response) =>{
    try {
      const {username,password} = req.body ;
      const record = await User.findByPk(username
        , { include: Role }
      );
      const roleId = record?.roleId

      if (!record)
      return res.status(401).json({ error: 'User not found' });
      
        //const match = await bcrypt.compare(user.password,record.password);
        const match = (password == record.password)
        if (!match) {
          return res.status(401).json({ error: 'Invalid password' });
        }
      
          const loginSecretKey = <Secret> process.env.ACCESS_TOKEN_SECRET ;
          const payload = {            
            username: record.username,
            roleId
        }
          const accessToken = jwt.sign(payload,
            loginSecretKey, { expiresIn: '1d' });

          // return 
          res.status(202).cookie('access-token', accessToken, {
            maxAge: 60 * 60 * 24 * 1000,  // = 1 days in milliseconds
            // maxAge converts to expires (here cookie will be removed after 7 days)
            httpOnly: true,
            // secure: true // limits the scope of the cookie to "secure" channels.
        });
        
        return res.status(200).json({
          message: 'successfully logged in to account',
          tokenData: payload, 
      });
        }
      
    
    catch (error) {
      return res.json("erorr");
    }}}
  
export default new AuthController()