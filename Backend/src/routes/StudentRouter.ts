import express from 'express';

const router = express.Router();
import studentController from '../controllers/StudentController';
import verifyAccessToken from '../middlewares/verifyAccessToken';
import verifyRoles from '../middlewares/verifyRole';
import {UserRoleEnum} from "../enums";

const {addStudent, getAll,deleteStudentById, getStudentTrainings} = studentController

// router.post('/student', verifyAccessToken, verifyRoles([UserRoleEnum.TRAINER]), addStudent);
router.post('/student', addStudent);
router.get('/students', getAll);
router.delete('/student/:id',deleteStudentById)
router.use(verifyAccessToken);
router.get('/trainings',getStudentTrainings)
export default router;