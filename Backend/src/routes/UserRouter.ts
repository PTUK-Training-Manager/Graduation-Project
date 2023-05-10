import express from "express";
const router = express.Router();
import userController from "../controllers/UserController";
import verifyResetToken from "../middlewares/verifyResetToken";
const {
  handleAddUser,
  getAll,
  deleteUserByPK,
  sendResetPassword,
  enterData,
  resetForgottenPassword,
} = userController;

router.post("/user", handleAddUser);
router.get("/users", getAll);
router.delete("/user/:username", deleteUserByPK);
router.post("/sendResetPassword", sendResetPassword);

router.use(verifyResetToken);
router.get("/enterData", enterData); 
router.post("/resetForgottenPassword", resetForgottenPassword);
export default router;
