import express from 'express';
const router = express.Router();
import studentController from '../controllers/student.controller';
import verifyJWT from '../middlewares/verifyJWT';
import verifyRoles from '../middlewares/verifyRole';
import { mapUserRoleStringToNum } from "src/enums";

router.post('/addStudent', verifyJWT(), verifyRoles(mapUserRoleStringToNum.STUDENT), studentController.addStudent);
router.get('/getAll', studentController.getAll);
router.delete('/deleteStudentById/:id', studentController.DeleteStudentById)

export default router;