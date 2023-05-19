import EvaluationController from "../controllers/EvaluationController"
import express from "express"
import verifyAccessToken from "../middlewares/verifyAccessToken";
const router = express.Router();
<<<<<<< HEAD
const { getStudentEvaluations, generateProgressForm, getPendingEvaluations, signEvaluation, rejectEvaluation, submitEvaluation, editEvaluation } = EvaluationController;
=======
const { getRejectedEvaluations, generateProgressForm, getPendingEvaluations, signEvaluation, rejectEvaluation, submitEvaluation, editEvaluation, getStudentPendingEvaluations } = EvaluationController;
>>>>>>> 55b9342e3151fac5c7bd1ded0e0a2940ded48e40
import verifyRoles from '../middlewares/verifyRole';
import { UserRoleEnum } from '../enums';

router.use(verifyAccessToken)
router.post('/progressForm', generateProgressForm);
router.patch('/sign', verifyRoles([UserRoleEnum.TRAINER]), signEvaluation);
router.post('/reject', verifyRoles([UserRoleEnum.TRAINER]), rejectEvaluation);
router.post('/evaluation', verifyRoles([UserRoleEnum.STUDENT]), submitEvaluation);
router.patch('/evaluation', verifyRoles([UserRoleEnum.STUDENT]), editEvaluation);
<<<<<<< HEAD
router.get('/pendingEvaluations', verifyRoles([UserRoleEnum.STUDENT, UserRoleEnum.TRAINER]), getPendingEvaluations);
router.post('/getStudentevaluations', verifyRoles([UserRoleEnum.STUDENT]), getStudentEvaluations)
=======
router.get('/pendingEvaluations', verifyRoles([ UserRoleEnum.TRAINER]), getPendingEvaluations);
router.post('/rejectedEvaluations', verifyRoles([UserRoleEnum.STUDENT]), getRejectedEvaluations)
router.post('/studentPendingEvaluations', verifyRoles([UserRoleEnum.STUDENT]), getStudentPendingEvaluations)
>>>>>>> 55b9342e3151fac5c7bd1ded0e0a2940ded48e40
export default router;
