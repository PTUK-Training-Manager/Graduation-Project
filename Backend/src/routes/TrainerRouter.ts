import express from 'express';
import TrainierController from '../controllers/TrainerController';
import verifyAccessToken from '../middlewares/verifyAccessToken';
const router = express.Router();
const {addtrainer,getAll}=TrainierController
router.post('/trainer',verifyAccessToken,addtrainer);
router.get('/trainers',getAll);

export default router;