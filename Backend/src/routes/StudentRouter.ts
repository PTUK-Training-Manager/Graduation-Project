import express from 'express';
const router = express.Router();
import studentController from '../controllers/StudentController';
import verifyJWT from '../middlewares/verifyJWT';
import verifyRoles from '../middlewares/verifyRole';
import { mapUserRoleStringToNum } from "src/enums";
const {addStudent,getAll}= studentController

router.post('/student', verifyJWT(), verifyRoles(mapUserRoleStringToNum.STUDENT),addStudent);
// router.post('/student',addStudent);

router.get('/students', getAll);
// router.delete('/student/:id', deleteStudentById)

export default router;