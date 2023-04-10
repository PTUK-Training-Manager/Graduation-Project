import express from 'express';
import trainerController from '@controllers/TrainingController';
const router = express.Router();
const {addtrainer,getAll}=trainerController

router.post('/trainer',addtrainer);
router.get('/trainers',getAll);

export default router;