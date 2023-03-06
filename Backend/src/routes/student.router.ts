import express from 'express';
const router = express.Router();
import studentController from '../controller/student.controller';

 router.get('/addStudent',studentController.addStudent);
 router.post('/getAll',studentController.getAll);

 export default router;