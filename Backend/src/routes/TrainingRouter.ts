import express from 'express';
import trainingController from "../controllers/TrainingController"

const router = express.Router();

const {getCompletedTrainings, handleGenerateFormButton,submittedStudents, getQuestions,submitQuestions} = trainingController;

router.get('/completedTrainings', getCompletedTrainings);
router.post('/evaluationForm', handleGenerateFormButton);
router.get('/submittedStudents',submittedStudents)
router.post('/questions',getQuestions)
router.post('/submitQuestions',submitQuestions)
// router.post('/students',getRecords)
export default router;