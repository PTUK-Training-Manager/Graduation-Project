import express from 'express';
import authController from "src/controllers/AuthController";
const router = express.Router();
const {handleLogin,logout}=authController

router.post('/signin',handleLogin);
router.get('/logout',logout);

export default router;