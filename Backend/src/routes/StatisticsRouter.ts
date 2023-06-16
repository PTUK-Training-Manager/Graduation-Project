import express from 'express';
const router = express.Router();
import statisticsController from '../controllers/StatisticsController';
import verifyAccessToken from '../middlewares/verifyAccessToken';
const { countStatus,countTrainingsCompany,countTrainingsType} = statisticsController


router.get("/countStatus", countStatus);
router.get("/countTrainingsCompany", countTrainingsCompany);
router.get("/countTrainingsType", countTrainingsType);
export default router;