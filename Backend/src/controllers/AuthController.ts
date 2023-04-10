import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';
import {Role, User} from "src/models"
import {Secret} from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { GeneratedResponse } from 'src/types';

class AuthController {
    handleLogin = async (req: Request, res: Response,next:NextFunction) => {
        try {
            const {username, password} = req.body;

            const record = await User.findOne({
                where: {username},
            });

            if (!record){
                let response:GeneratedResponse={
                    success:false,
                    status:res.statusCode,
                    message: "Username/password do not match"
                }
                return res.json(response);
}
            const roleId = record?.roleId;

            const match = await bcrypt.compare(password, record.password);

            if (!match) {
                let response:GeneratedResponse={
                    success:false,
                    status:res.statusCode,
                    message:  "Username/password do not match"
                }
                return res.json(response);
            }

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

            let response:GeneratedResponse={

                success:true,
                status:res.statusCode,
                message:'successfully logged in to account',
                data: payload
            }
            return res.json(response);
        } catch (err) {
            next(err)
        }
    }
}

export default new AuthController()