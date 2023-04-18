import express from 'express';
import trainingController from "../controllers/TrainingController"
import verifyAccessToken from '../middlewares/verifyAccessToken';
const router = express.Router();
const { cancleTraining, editTrainer, joinTrainingWithTrainer, getCompletedTrainings, getAcceptedTrainings, handleGenerateFormButton, submittedStudents, getQuestions, submitQuestionsWithAnswers, getRecords, getRunningTrainings } = trainingController;

router.post('/joinTrainingWithTrainer', joinTrainingWithTrainer);
router.post('/editTrainer', editTrainer);
router.get('/cancleTraining/:id', cancleTraining);
router.post('/evaluationForm', handleGenerateFormButton);
router.get('/submittedStudents', submittedStudents);
router.post('/questions', getQuestions);
router.post('/submitQuestionsAnswers', submitQuestionsWithAnswers);
router.post('/students', getRecords);
router.use(verifyAccessToken);
router.get('/completedTrainings', getCompletedTrainings);
router.get('/runningTrainings', getRunningTrainings);
router.get('/acceptedTrainings', getAcceptedTrainings);
export default router;