import express from 'express';
import trainingController from "@controllers/TrainingController"
const router = express.Router();

router.get('/completedTrainings',trainingController.getCompletedTrainings);

export default router;