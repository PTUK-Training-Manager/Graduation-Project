import {verify, JwtPayload, Secret} from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import {Request, Response, NextFunction} from 'express';

const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies['access-token'];
    const secret = process.env.ACCESS_TOKEN_SECRET as Secret;
    try {
        const decodedPayload = verify(accessToken, secret) as JwtPayload;
        const {username, roleId} = decodedPayload;

        req.user = {
            username,
            roleId
        }
        next();
    } catch (error) {
        // next(error);
        return res.status(401).json({
            success: false,
            message: 'Invalid access token',
            status: 401,
        })
    }
}

export default verifyAccessToken

