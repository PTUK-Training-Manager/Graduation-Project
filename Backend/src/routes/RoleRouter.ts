import express, { NextFunction } from 'express';
import Role from 'src/models/Role';
import {Request, Response} from 'express';
import { GeneratedResponse } from 'src/types';

const router = express.Router();

router.get('/roles', async (req: Request, res: Response,next:NextFunction) => {
    try {
        const records = await Role.findAll({});
        let response:GeneratedResponse={
            success:true,
            status:res.statusCode,
            message:"Roles:",
            data:records
        }
        return res.json(response);
    } catch (err) {
        next(err);
    }
});

export default router;