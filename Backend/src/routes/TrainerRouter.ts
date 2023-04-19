import express from 'express';
import TrainierController from '../controllers/TrainerController';
import verifyAccessToken from '../middlewares/verifyAccessToken';
const router = express.Router();
const {addtrainer,getAll,updateTrainer,deactivateTrainer}=TrainierController
router.get('/trainers',getAll);

router.use(verifyAccessToken)
router.post('/trainer',addtrainer);
router.patch('/trainer', updateTrainer)
router.delete('/trainer',deactivateTrainer)

export default router;