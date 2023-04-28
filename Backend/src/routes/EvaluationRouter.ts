import EvaluationController from "../controllers/EvaluationController"
import express from "express"
import verifyAccessToken from "../middlewares/verifyAccessToken";
const router = express.Router();
const { getRejectedEvaluations,generateProgressForm, getPendingEvaluations, signEvaluation, rejectEvaluation, submitEvaluation,editEvaluation } = EvaluationController;

router.post('/progressForm', generateProgressForm);
router.patch('/sign/:id', signEvaluation);
router.post('/reject', rejectEvaluation);
router.post('/evaluation', submitEvaluation);
router.patch('/evaluation', editEvaluation);
router.use(verifyAccessToken);
router.get('/pendingEvaluations', getPendingEvaluations);
router.get('/rejectedEvaluations',getRejectedEvaluations)
export default router;
