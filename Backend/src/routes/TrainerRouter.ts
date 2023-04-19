import express from 'express';
import TrainierController from '../controllers/TrainerController';
import verifyAccessToken from '../middlewares/verifyAccessToken';
const router = express.Router();
const {addtrainer,getAll,editTrainerData,disableTrainer}=TrainierController
router.post('/trainer',verifyAccessToken,addtrainer);
router.get('/trainers',getAll);
router.put('/trainer',editTrainerData)
router.delete('/trainer',disableTrainer)

export default router;