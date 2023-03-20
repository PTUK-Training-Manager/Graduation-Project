import express from 'express';
const router = express.Router();
import UserRouter from '../controller/userController';

router.post('/addUser',UserRouter.addUser);
router.get('/getAll',UserRouter.getAll);
router.delete('/DeleteUserByPK/:username',UserRouter.DeleteUserByPK)
export default router;