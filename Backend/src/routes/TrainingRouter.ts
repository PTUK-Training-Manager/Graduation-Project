import express from 'express';
import trainingController from "../controllers/TrainingController"
import verifyAccessToken from '../middlewares/verifyAccessToken';
const router = express.Router();
const { getAllTrainings, changeTrainingStatus, assignTrainer, getCompletedTrainings, getAcceptedTrainings, handleGenerateFormButton, submittedStudents, getQuestions, getRunningTrainings ,submitQuestions} = trainingController;


router.patch('/assignTrainer', assignTrainer);
router.patch('/changeTrainingStatus', changeTrainingStatus); //accept/reject/cancle
router.get('/submittedStudents', submittedStudents);
router.post('/submitQuestions', submitQuestions);
// router.post('/students', getRecords);
router.use(verifyAccessToken);
router.get('/completedTrainings', getCompletedTrainings);
router.get('/runningTrainings', getRunningTrainings);
router.get('/acceptedTrainings', getAcceptedTrainings);
router.get('/questions', getQuestions);
router.get('/trainings', getAllTrainings);
router.post('/evaluationForm', handleGenerateFormButton);
export default router;