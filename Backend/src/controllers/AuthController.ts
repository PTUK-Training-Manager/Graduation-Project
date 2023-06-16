import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { User } from "../models"
import { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {BaseResponse, LoginResponse} from '/types';
import {isProduction} from "../utils";

class AuthController {
    handleLogin = async (req: Request, res: Response<LoginResponse>, next: NextFunction) => {
        try {
            const { username, password } = req.body;

            const record = await User.findOne({
                where: { username },
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
                userId: record.id,
                username: record.username,
                roleId,
                name: record.name,
                permissions: [], // supported but not used yet in this project
            }

            const accessToken = jwt.sign(payload, accessTokenSecret, { expiresIn: '7d' });

            res.status(202).cookie('access-token', accessToken, {
                maxAge: 7 * 60 * 60 * 24 * 1000,  // = 7 days in milliseconds
                httpOnly: true,
                secure: true, // limits the scope of the cookie to "secure" channels.
                domain: isProduction
                    ? ".onrender.com"
                    : "localhost"
            });

            return res.status(200).json({
                success: true,
                status: res.statusCode,
                message: 'successfully logged in to account',
                data: payload,
                accessToken
            });
        } catch (err) {
            next(err)
        }
    }

    autoSignInUser = async (req: Request, res: Response<BaseResponse>, next: NextFunction) => {
        /**
         * The program reaches here only if the `validateAccessToken` middleware
         * function allowed the request to pass to
         * this point by calling the next() function:
         */

        return res.json({
            success: true,
            status: res.statusCode,
            message: 'successfully logged in to account',
            data: req.user // req.user is an object contains the decoded payload from jwt
        });
    }

    logout = async (req: Request, res: Response<BaseResponse>, next: NextFunction) => {
        try {
            res.clearCookie('access-token');
            return res.json({
                success: true,
                status: res.statusCode,
                message: "Successfully logout",
            });
        } catch (err) {
            next(err);
        }
    }
}

export default new AuthController()