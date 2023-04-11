import express from 'express';
import trainerController from '@controllers/TrainerController';
const router = express.Router();

router.post('/addTrainer',trainerController.addtrainer);
router.get('/getAll',trainerController.getAll);

export default router;