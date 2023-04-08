import express from 'express';
import authController from "src/controllers/AuthController";
const router = express.Router();

router.post('/signin',authController.handleLogin);

export default router;