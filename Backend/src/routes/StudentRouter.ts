import express from 'express';

const router = express.Router();
import studentController from '../controllers/StudentController';
import verifyAccessToken from '../middlewares/verifyAccessToken';
import verifyRoles from '../middlewares/verifyRole';
import {UserRoleEnum} from "../enums";

const {addStudent, getAll,deleteStudentById} = studentController

// router.post('/student', verifyAccessToken, verifyRoles([UserRoleEnum.TRAINER]), addStudent);
router.post('/student', addStudent);
router.use(verifyAccessToken);
router.get('/students',verifyRoles([UserRoleEnum.Company]), getAll);
router.delete('/student/:id',deleteStudentById)


export default router;