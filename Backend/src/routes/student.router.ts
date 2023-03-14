import express from 'express';
const router = express.Router();
import studentController from '../controller/student.controller';
import verifyJWT from '../middleWare/verifyJWT';
import verifyRoles from '../middleWare/verifyRole';

//  router.post('/addStudent',verifyJWT(),verifyRoles(userRoleEnum.student, userRoleEnum.student),studentController.addStudent);
router.post('/addStudent',verifyJWT(),verifyRoles(3),studentController.addStudent); 
router.get('/getAll',studentController.getAll);
router.delete('/deleteStudentById/:id',studentController.DeleteStudentById)

 export default router;