import express from 'express';
import RequestController from "@controllers/TrainingRequestController";
const router = express.Router();
const {submitRequest,getPendingRequest,deleteRequest,submittedStudents, getQuestions,submitQuestionsWithAnswers,submitTrainingwithoutAnswers}= RequestController

router.post('/request', submitRequest);
router.get('/pendingRequests', getPendingRequest);
router.delete('/request/:id', deleteRequest)
router.get('/submittedStudents',submittedStudents)
router.post('/questions',getQuestions)
router.post('/submitQuestionsAnswers',submitQuestionsWithAnswers)
router.post('/submitTraining',submitTrainingwithoutAnswers)

export default router;