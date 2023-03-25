import express from 'express';
import Role from 'src/models/role';
import {Request, Response} from 'express';

const router = express.Router();

router.get('/getAll', async (req: Request, res: Response) => {
    try {
        const records = await Role.findAll({});
        return res.json(records);
    } catch (e) {
        return res.json({msg: "fail to read", status: 500, route: "/read"});
    }
});

export default router;