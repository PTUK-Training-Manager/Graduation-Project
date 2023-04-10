import express from 'express';
import authController from "src/controllers/AuthController";
const router = express.Router();
const {handleLogin}=authController

router.post('/signin',handleLogin);

export default router;