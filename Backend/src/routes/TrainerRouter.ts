import express from 'express';
import TrainierController from '../controllers/TrainerController';
import verifyAccessToken from '../middlewares/verifyAccessToken';
const router = express.Router();
const {addtrainer,getAll,editTrainerData,deleteTrainer}=TrainierController
router.post('/trainer',verifyAccessToken,addtrainer);
router.get('/trainers',getAll);
router.put('/trainer',editTrainerData)
router.delete('/trainer',deleteTrainer)

export default router;