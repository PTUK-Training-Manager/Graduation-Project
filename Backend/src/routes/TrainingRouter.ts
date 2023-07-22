import express from "express";
import trainingController from "../controllers/TrainingController";
import verifyAccessToken from "../middlewares/verifyAccessToken";

const router = express.Router();
const {
  getAllTrainings,
  changeTrainingStatus,
  assignTrainer,
  getCompletedTrainings,
  getAcceptedTrainings,
  handleGenerateFormButton,
  getsubmittedStudents,
  getQuestions,
  getRunningTrainings,
  submitQuestions,
  generateEvaluationForm,
  getRunningAndFinishedTrainings,
  getStudentTrainingId,
} = trainingController;
import verifyRoles from "../middlewares/verifyRole";
import { UserRoleEnum } from "../enums";
import validatePagination from "../validators/validatePagination";
import handleValidationResult from "../middlewares/handleValidationResult";

router.use(verifyAccessToken);
router.patch(
  "/assignTrainer",
  verifyRoles([UserRoleEnum.Company]),
  assignTrainer,
);
router.patch(
  "/changeTrainingStatus",
  verifyRoles([UserRoleEnum.Company]),
  changeTrainingStatus,
); //accept/reject/cancle
router.get(
  "/runningAndFinishedStudents",
  verifyRoles([UserRoleEnum.TRAINER]),
  validatePagination(),
  handleValidationResult,
  getRunningAndFinishedTrainings,
);
router.get(
  "/submittedStudents",
  verifyRoles([UserRoleEnum.UNI_TRAINING_OFFICER]),
  validatePagination(),
  handleValidationResult,
  getsubmittedStudents,
);
router.post("/submitQuestions", submitQuestions);
// router.post('/students', getRecords);
router.get(
  "/completedTrainings",
  validatePagination(),
  handleValidationResult,
  getCompletedTrainings,
);
router.get(
  "/runningTrainings",
  validatePagination(),
  handleValidationResult,
  getRunningTrainings,
);
router.get(
  "/acceptedTrainings",
  validatePagination(),
  handleValidationResult,
  getAcceptedTrainings,
);
router.get("/questions", getQuestions);
router.get(
  "/trainings",
  validatePagination(),
  handleValidationResult,
  getAllTrainings,
);

router.post(
  "/evaluationFormForUniversity",
  verifyRoles([UserRoleEnum.UNI_TRAINING_OFFICER]),
  handleGenerateFormButton,
);
router.post(
  "/evaluationForm",
  verifyRoles([
    UserRoleEnum.Company,
    UserRoleEnum.TRAINER,
    UserRoleEnum.STUDENT,
    UserRoleEnum.UNI_TRAINING_OFFICER,
  ]),
  generateEvaluationForm,
);
router.get("/studentsRunningTraining", getStudentTrainingId);
export default router;
