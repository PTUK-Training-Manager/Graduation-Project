import express from 'express';
const router = express.Router();
import UserRouter from '../controller/userController';

router.post('/addUser',UserRouter.addUser);

export default router;