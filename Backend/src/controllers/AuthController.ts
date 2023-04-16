import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';
import {User} from "../models"
import {Secret} from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class AuthController {
    handleLogin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {username, password} = req.body;

            const record = await User.findOne({
                where: {username},
            });

            if (!record) 
                return res.status(401).json({
                    success: false,
                    status: res.statusCode,
                    message: "Username/password do not match"
                });
            
            const roleId = record?.roleId;

            const match = await bcrypt.compare(password, record.password);

            if (!match) 
                return res.status(401).json({
                    success: false,
                    status: res.statusCode,
                    message: "Username/password do not match"
                });

            const accessTokenSecret = <Secret>process.env.ACCESS_TOKEN_SECRET;

            const payload = {
                username: record.username,
                roleId
            }

            const accessToken = jwt.sign(payload, accessTokenSecret, {expiresIn: '7d'});

            res.status(202).cookie('access-token', accessToken, {
                maxAge: 7 * 60 * 60 * 24 * 1000,  // = 7 days in milliseconds
                httpOnly: true,
                // secure: true // limits the scope of the cookie to "secure" channels.
            });

            return res.status(200).json({
                success: true,
                status: res.statusCode,
                message: 'successfully logged in to account',
                stack: payload
            });
        } catch (err) {
            next(err)
        }
    }

    autoSignInUser = async (req: Request, res: Response, next: NextFunction) => {
        /**
         * The program reaches here only if the `validateAccessToken` middleware
         * function allowed the request to pass to
         * this point by calling the next() function:
         */

        return res.json({
            success: true,
            status: res.statusCode,
            message: 'successfully logged in to account',
            stack: req.user // req.user is an object contains the decoded payload from jwt
        });
    }
}

export default new AuthController()