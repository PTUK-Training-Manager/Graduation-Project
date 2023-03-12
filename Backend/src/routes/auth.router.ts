import express from 'express';
const router = express.Router();
import authRouter from '../controller/authController';

router.get('/signin',authRouter.handleLogin);

export default router;