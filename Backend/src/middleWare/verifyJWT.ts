import jwt, { Secret } from 'jsonwebtoken';
require('dotenv').config();
import { Request, Response,NextFunction } from 'express';
import { LoginPayload } from '../types/';

const verifyJWT =()=>{
    return  async (req:Request, res:Response, next:NextFunction) => {
    // const authHeader = req.headers.authorization || req.headers.Authorization;
    const token = req.cookies['access-token'];
    // if (!authHeader?.toString().startsWith('Bearer ')) 
    // return res.json("h");
    // const token = authHeader?.toString().split(' ')[1];
    const secret = <Secret> process.env.ACCESS_TOKEN_SECRET;
    jwt.verify( token, secret, (error: Error, decoded: any) => {
            if (error) return res.sendStatus(403).json("sh"); //invalid token
            req.user ={username:'haneen',
                        roleId:1}
            // req.user.roleId= decoded.roleId;
            // console.log(decoded)
            next();
        }
    );
}
}
export default verifyJWT

