import express from 'express';
import authController from "src/controllers/authController";
const router = express.Router();

router.post('/signin',authController.handleLogin);

export default router;