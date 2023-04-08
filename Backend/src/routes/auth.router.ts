import express from 'express';
import authController from '@controllers/authController';
const router = express.Router();
const {handleLogin}=authController

router.post('/signin',handleLogin);

export default router;