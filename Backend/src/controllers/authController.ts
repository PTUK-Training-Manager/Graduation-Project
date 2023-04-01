import jwt from 'jsonwebtoken';
import {Request, Response} from 'express';
import {Role, User} from "src/models"
import {Secret} from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class AuthController {
    handleLogin = async (req: Request, res: Response) => {
        try {
            const {username, password} = req.body;
            const record = await User.findOne({
                where: {username},
            });

            if (!record)
                return res.status(401).json({error: "Username/password do not match"});

            const roleId = record?.roleId;

            const match = await bcrypt.compare(password, record.password);

            if (!match) {
                return res.status(401).json({error: "Username/password do not match"});
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

            return res.status(200).json({
                message: 'successfully logged in to account',
                tokenData: payload,
                // record
            });
        } catch (error) {
            return res.json("erorr");
        }
    }
}

export default new AuthController()