import express, {Request, Response} from 'express';
import {Trainer} from '../model/trainer';

const router = express.Router();

router.get('/getTrainers', async (req: Request, res: Response) => {
        try {
            const records = await Trainer.findAll({});
            return res.json(records);
        } catch (e) {
            return res.json({msg: "fail to read", status: 500, route: "/read"});
        }
    });

export default router;