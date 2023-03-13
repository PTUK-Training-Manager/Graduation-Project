import express from 'express';
const router = express.Router();
import studentController from '../controller/student.controller';
import verifyJWT from '../middleWare/verifyJWT';

 router.post('/addStudent',verifyJWT(),studentController.addStudent);
 router.get('/getAll',studentController.getAll);

 export default router;