import express from 'express';
const router = express.Router();
import studentController from '../controller/student.controller';

 router.post('/addStudent',studentController.addStudent);
 router.get('/getAll',studentController.getAll);

 export default router;