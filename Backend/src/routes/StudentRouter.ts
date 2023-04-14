import express from 'express';

const router = express.Router();
import studentController from '../controllers/StudentController';
import verifyAccessToken from '../middlewares/verifyAccessToken';
import verifyRoles from '../middlewares/verifyRole';
import {UserRoleEnum} from "../enums";

const {addStudent, getAll} = studentController

router.post('/student', verifyAccessToken, verifyRoles([UserRoleEnum.TRAINER]), addStudent);

router.get('/students', getAll);

export default router;