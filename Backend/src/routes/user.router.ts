import express from 'express';
const router = express.Router();
import userController from '@controllers/userController';

router.post('/addUser',userController.handleAddUser);
router.get('/getAll',userController.getAll);
router.delete('/DeleteUserByPK/:username',userController.DeleteUserByPK);

export default router;