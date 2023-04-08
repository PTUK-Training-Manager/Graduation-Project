import express from 'express';
import authController from "src/controllers/auth.controller";
const router = express.Router();

router.post('/signin',authController.handleLogin);

export default router;