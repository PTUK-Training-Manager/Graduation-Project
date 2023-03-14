import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
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
    try {
        const decoded = jwt.verify(token, secret) as JwtPayload;
        req.user = decoded.UserInfo.username;
        req.role = decoded.UserInfo.roleid;
        next();
    } catch (error) {
        return res.sendStatus(403).json("sh"); // invalid token
    }

}
}
export default verifyJWT

