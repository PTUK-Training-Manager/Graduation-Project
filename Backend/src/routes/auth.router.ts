import express from 'express';
const router = express.Router();
import authRouter from '../controller/authController';

router.post('/signin',authRouter.handleLogin);

export default router;