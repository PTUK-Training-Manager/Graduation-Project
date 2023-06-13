import express from 'express';
import TrainierController from '../controllers/TrainerController';
import verifyAccessToken from '../middlewares/verifyAccessToken';
const router = express.Router();
const { addtrainer, updateTrainer, deactivateTrainer } = TrainierController
import verifyRoles from '../middlewares/verifyRole';
import { UserRoleEnum } from '../enums';

// router.get('/trainers', getAll);

router.use(verifyAccessToken)
router.use(verifyRoles([UserRoleEnum.Company]))
router.post('/trainer', addtrainer);
router.patch('/trainer', updateTrainer)
router.patch('/deactivateTrainer', deactivateTrainer)

export default router;