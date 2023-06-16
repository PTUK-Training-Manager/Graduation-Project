import { verify, JwtPayload, Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { Request, Response, NextFunction } from 'express';

const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
    // const accessToken = req.cookies['access-token']; // doesn't work on production
    const accessToken = req.headers["access-token"] as string;

    /**
     * If there's no such a cookie, then there's no access token to be verified.
     */
    if (!accessToken)
        return res.status(401).json({
            success: false,
            message: "No access token",
            status: 401,
        });

    const secret = process.env.ACCESS_TOKEN_SECRET as Secret;
    try {
        const decodedPayload = verify(accessToken, secret) as JwtPayload;
        const { userId, username, roleId } = decodedPayload;

        req.user = {
            userId,
            username,
            roleId
        }
        next();
    } catch (error) {
        // next(error);
        return res.status(401).json({
            success: false,
            message: "Invalid access token",
            status: 401,
            error
        })
    }
}

export default verifyAccessToken

