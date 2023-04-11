import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
require('dotenv').config();
import { Request, Response, NextFunction } from 'express';
import { LoginPayload } from 'src/types';

const verifyJWT = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies['access-token'];
        const secret = <Secret>process.env.ACCESS_TOKEN_SECRET;
        try {
            const decoded = jwt.verify(token, secret) as JwtPayload;
            req.user = decoded.username;
            req.role = decoded.roleId;
            return next();
        } catch (error) {
            return res.status(403).json("invalid Token");
        }

    }
}
export default verifyJWT

