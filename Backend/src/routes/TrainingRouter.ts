import express from 'express';
import trainingController from "../controllers/TrainingController"
const router = express.Router();

router.get('/completedTrainings', trainingController.getCompletedTrainings);
router.post('/evaluationForm', trainingController.handlegenerateFormButton);

export default router;