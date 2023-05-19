import express from 'express';
import trainingController from "../controllers/TrainingController"
import verifyAccessToken from '../middlewares/verifyAccessToken';
const router = express.Router();
const { getAllTrainings, changeTrainingStatus, assignTrainer, getCompletedTrainings, getAcceptedTrainings, handleGenerateFormButton,getsubmittedStudents, getQuestions, getRunningTrainings, submitQuestions, generateEvaluationForm , getRunningAndFinishedStudents, getStudentTrainingId} = trainingController;
import verifyRoles from '../middlewares/verifyRole';
import { UserRoleEnum } from '../enums';

router.use(verifyAccessToken);
router.patch('/assignTrainer', verifyRoles([UserRoleEnum.Company]), assignTrainer);
router.patch('/changeTrainingStatus', verifyRoles([UserRoleEnum.Company]), changeTrainingStatus); //accept/reject/cancle
router.get('/runningAndFinishedStudents',verifyRoles([UserRoleEnum.TRAINER]),getRunningAndFinishedStudents)
router.get('/submittedStudents', verifyRoles([UserRoleEnum.UNI_TRAINING_OFFICER]), getsubmittedStudents);
router.post('/submitQuestions', submitQuestions);
// router.post('/students', getRecords);
router.get('/completedTrainings', getCompletedTrainings);
router.get('/runningTrainings', getRunningTrainings);
router.get('/acceptedTrainings', getAcceptedTrainings);
router.get('/questions', getQuestions);
router.get('/trainings', getAllTrainings);
router.post('/evaluationFormForUniversity', verifyRoles([UserRoleEnum.UNI_TRAINING_OFFICER]), handleGenerateFormButton);
<<<<<<< HEAD
router.post('/evaluationForm', verifyRoles([UserRoleEnum.Company, UserRoleEnum.TRAINER, UserRoleEnum.STUDENT, UserRoleEnum.UNI_TRAINING_OFFICER]), generateEvaluationForm);
=======
router.post('/evaluationForm', verifyRoles([UserRoleEnum.Company, UserRoleEnum.TRAINER, UserRoleEnum.STUDENT]), generateEvaluationForm);
router.get('/studentsRunningTraining', getStudentTrainingId);
>>>>>>> 55b9342e3151fac5c7bd1ded0e0a2940ded48e40
export default router;