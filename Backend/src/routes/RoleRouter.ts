import express, { NextFunction } from 'express';
import Role from '../models/Role';
import { Request, Response } from 'express';
import { BaseResponse } from '../types';

const router = express.Router();

router.get('/roles', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const records = await Role.findAll({});
        let response: BaseResponse = {
            success: true,
            status: res.statusCode,
            message: "Roles:",
            data: records
        }
        return res.json(response);
    } catch (err) {
        next(err);
    }
});

export default router;