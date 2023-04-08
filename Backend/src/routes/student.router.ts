import express from 'express';
const router = express.Router();
import StudentController from '@controllers/student.controller';
import verifyJWT from '../middlewares/verifyJWT';
import verifyRoles from '../middlewares/verifyRole';
import { mapUserRoleStringToNum } from "src/enums";
const {addStudent,getAll,deleteStudentById}= StudentController

router.post('/student', verifyJWT(), verifyRoles(mapUserRoleStringToNum.SUPER_ADMIN),addStudent);
// router.post('/student',addStudent);

router.get('/students', getAll);
router.delete('/student/:id', deleteStudentById)

export default router;