import express from 'express';

const router = express.Router(); // Create Express Router

import studentRouter from './student.router';
import trainerRouter from './trainer.router';
import authRouter from './auth.router';
import userRouter from './user.router';
import rolesRouter from './roles.router';
import companyRouter from './company.router';

router.use("/student", studentRouter);
router.use("/trainer", trainerRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/Role", rolesRouter);
router.use("/company", companyRouter);

export default router;