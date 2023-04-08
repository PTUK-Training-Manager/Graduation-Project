import express from 'express';
import TrainerController from '../controllers/trainerController';
const router = express.Router();
const {addtrainer,getAll}=TrainerController

router.post('/trainer',addtrainer);
router.get('/trainers',getAll);

export default router;