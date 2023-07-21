import express from "express";
import RequestController from "../controllers/TrainingRequestController";
import verifyAccessToken from "../middlewares/verifyAccessToken";
const router = express.Router();
const { submitRequest, getPendingRequest, deleteRequest, getTrainingRequest } =
  RequestController;
import verifyRoles from "../middlewares/verifyRole";
import { UserRoleEnum } from "../enums";
import validatePagination from "../validators/validatePagination";
import handleValidationResult from "../middlewares/handleValidationResult";

router.use(verifyAccessToken);
router.post(
  "/request",
  verifyRoles([UserRoleEnum.UNI_TRAINING_OFFICER]),
  submitRequest,
);
router.get(
  "/pendingRequests",
  verifyRoles([UserRoleEnum.UNI_TRAINING_OFFICER]),
  validatePagination(),
  handleValidationResult,
  getPendingRequest,
);
router.delete(
  "/request/:id",
  verifyRoles([UserRoleEnum.UNI_TRAINING_OFFICER]),
  deleteRequest,
);
router.get(
  "/trainingRequests",
  verifyRoles([UserRoleEnum.Company]),
  validatePagination(),
  handleValidationResult,
  getTrainingRequest,
);

export default router;
