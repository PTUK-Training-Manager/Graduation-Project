import express from 'express';

const router = express.Router();
import studentController from '../controllers/StudentController';
import verifyAccessToken from '../middlewares/verifyAccessToken';
import verifyRoles from '../middlewares/verifyRole';
import { UserRoleEnum } from "../enums";

const { addStudent } = studentController


router.use(verifyAccessToken);
router.post('/student', addStudent);
// router.get('/students', verifyRoles([UserRoleEnum.Company]), getAll);
// router.delete('/student/:id', deleteStudentById)


export default router;