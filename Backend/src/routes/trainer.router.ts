import express, {Request, Response} from 'express';
const router = express.Router();

import TrainerRouter from '../controller/trainerController';

router.post('/addTrainer',TrainerRouter.addtrainer);
router.get('/getAll',TrainerRouter.getAll);

export default router;