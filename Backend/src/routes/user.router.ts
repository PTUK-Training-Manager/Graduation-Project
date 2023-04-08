import express from 'express';
const router = express.Router();
import userController from '@controllers/userController';
const {handleAddUser, getAll ,deleteUserByPK}=userController

router.post('/user',handleAddUser);
router.get('/users',getAll);
router.delete('/user/:username',deleteUserByPK);

export default router;