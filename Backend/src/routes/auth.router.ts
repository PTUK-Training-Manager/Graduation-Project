import express from 'express';
import authController from "src/controller/authController";
const router = express.Router();

router.post('/signin',authController.handleLogin);

export default router;