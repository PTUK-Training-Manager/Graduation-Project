import express from 'express';
const router = express.Router();
import userController from '@controllers/UserController';
const {handleAddUser, getAll }=userController

router.post('/user',handleAddUser);
router.get('/users',getAll);
// router.delete('/user/:id',deleteUserByPK);
export default router;