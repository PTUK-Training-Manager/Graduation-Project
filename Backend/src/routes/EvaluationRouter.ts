import EvaluationController from "../controllers/EvaluationController"
import express from "express"
import verifyAccessToken from "../middlewares/verifyAccessToken";
const router = express.Router();
const { getRejectedEvaluations, generateProgressForm, getPendingEvaluations, signEvaluation, rejectEvaluation, submitEvaluation, editEvaluation, getStudentPendingEvaluations } = EvaluationController;
import verifyRoles from '../middlewares/verifyRole';
import { UserRoleEnum } from '../enums';

router.use(verifyAccessToken)
router.post('/progressForm', generateProgressForm);
router.patch('/sign', verifyRoles([UserRoleEnum.TRAINER]), signEvaluation);
router.post('/reject', verifyRoles([UserRoleEnum.TRAINER]), rejectEvaluation);
router.post('/evaluation', verifyRoles([UserRoleEnum.STUDENT]), submitEvaluation);
router.patch('/evaluation', verifyRoles([UserRoleEnum.STUDENT]), editEvaluation);
router.get('/pendingEvaluations', verifyRoles([ UserRoleEnum.TRAINER]), getPendingEvaluations);
router.post('/rejectedEvaluations', verifyRoles([UserRoleEnum.STUDENT]), getRejectedEvaluations)
router.post('/studentPendingEvaluations', verifyRoles([UserRoleEnum.STUDENT]), getStudentPendingEvaluations)
export default router;