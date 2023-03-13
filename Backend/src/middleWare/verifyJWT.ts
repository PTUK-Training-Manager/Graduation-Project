const jwt = require('jsonwebtoken');
require('dotenv').config();
import { Request, Response,NextFunction } from 'express';

const verifyJWT =()=>{
    return  async (req:any, res:Response, next:NextFunction) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.toString().startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader?.toString().split(' ')[1];

    jwt.verify( token, process.env.ACCESS_TOKEN_SECRET, (error:Error, decoded:any) => {
            if (error) return res.sendStatus(403); //invalid token
            req.user = decoded.UserInfo.username;
            req.role= decoded.UserInfo.roleid;
            next();
        }
    );
}
}
export default verifyJWT

