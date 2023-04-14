import express from 'express';
import trainingController from "../controllers/TrainingController"

const router = express.Router();

const {getCompletedTrainings, handleGenerateFormButton} = trainingController;

router.get('/completedTrainings', getCompletedTrainings);
router.post('/evaluationForm', handleGenerateFormButton);

export default router;