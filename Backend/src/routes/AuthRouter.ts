import express from 'express';
import authController from "../controllers/AuthController";
import verifyAccessToken from "../middlewares/verifyAccessToken";

const router = express.Router();
const {handleLogin, autoSignInUser} = authController;

router.post('/signin', handleLogin);
router.get("/verifyAccessToken", verifyAccessToken, autoSignInUser);

export default router;