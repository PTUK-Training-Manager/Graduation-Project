import EvaluationController from "../controllers/EvaluationController"
import express from "express"
import verifyAccessToken from "../middlewares/verifyAccessToken";
const router = express.Router();
const {generateProgressForm, getPendingEvaluations,signEvaluation,rejectEvaluation} = EvaluationController;

router.post('/progressForm', generateProgressForm);
router.patch('/sign/:id',signEvaluation);
router.post('/reject',rejectEvaluation);
router.use(verifyAccessToken);
router.get('/pendingEvaluations', getPendingEvaluations);
export default router;
