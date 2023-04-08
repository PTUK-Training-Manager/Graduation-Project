import express from 'express';
const router = express.Router();
import userController from '@controllers/UserController';

router.post('/addUser',userController.addUser);
router.get('/getAll',userController.getAll);
router.delete('/DeleteUserByPK/:username',userController.DeleteUserByPK);

export default router;