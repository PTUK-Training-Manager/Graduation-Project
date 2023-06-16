import express from 'express';

const router = express.Router(); // Create Express Router

import studentRouter from './StudentRouter';
import trainerRouter from './TrainerRouter';
import authRouter from './AuthRouter';
import userRouter from './UserRouter';
import rolesRouter from './RoleRouter';
import requestRouter from './TrainingRequestRouter';
import trainingRouter from './TrainingRouter';
import companyRouter from './CompanyRouter';
import evaluationRouter from "./EvaluationRouter";
import adminRouter from "./FileRoute";
import statisticsRouter from "./StatisticsRouter";

router.use("/student", studentRouter);
router.use("/trainer", trainerRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/role", rolesRouter);
router.use("/request", requestRouter);
router.use("/training", trainingRouter);
router.use("/company", companyRouter);
router.use("/evaluation", evaluationRouter);
router.use("/admin", adminRouter);
router.use("/statistics", statisticsRouter);


export default router;