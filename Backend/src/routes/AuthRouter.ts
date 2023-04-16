import express from 'express';
import authController from "../controllers/AuthController";
import verifyAccessToken from "../middlewares/verifyAccessToken";

const router = express.Router();
const {handleLogin,logout, autoSignInUser} = authController;

router.post('/signin', handleLogin);
router.get("/verifyAccessToken", verifyAccessToken, autoSignInUser);
router.get('/logout',logout);

export default router;