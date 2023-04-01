import express from 'express';
const router = express.Router();
import studentController from '../controllers/student.controller';
import verifyJWT from '../middlewares/verifyJWT';
import verifyRoles from '../middlewares/verifyRole';
//,
//  router.post('/addStudent',verifyJWT(),verifyRoles(userRoleEnum.student, userRoleEnum.student),studentController.addStudent);
router.post('/addStudent',verifyJWT(),verifyRoles(4),studentController.addStudent); 
router.get('/getAll',studentController.getAll);
router.delete('/deleteStudentById/:id',studentController.DeleteStudentById)

 export default router;