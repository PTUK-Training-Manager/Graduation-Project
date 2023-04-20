import express from 'express';
import trainingController from "../controllers/TrainingController"
import verifyAccessToken from '../middlewares/verifyAccessToken';
const router = express.Router();
const { changeTrainingStatus, assignTrainer, getCompletedTrainings, getAcceptedTrainings, handleGenerateFormButton, submittedStudents, getQuestions, getRunningTrainings } = trainingController;


router.patch('/assignTrainer', assignTrainer);
router.patch('/changeTrainingStatus', changeTrainingStatus); //accept/reject/cancle
router.post('/evaluationForm', handleGenerateFormButton);
router.get('/submittedStudents', submittedStudents);
// router.post('/submitQuestionsAnswers', submitQuestionsWithAnswers);
// router.post('/students', getRecords);
router.use(verifyAccessToken);
router.get('/completedTrainings', getCompletedTrainings);
router.get('/runningTrainings', getRunningTrainings);
router.get('/acceptedTrainings', getAcceptedTrainings);
router.get('/questions', getQuestions);
export default router;