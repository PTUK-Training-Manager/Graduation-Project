import express from 'express';
const router = express.Router();
import userController from '../controllers/UserController';
import verifyAccessToken from '../middlewares/verifyAccessToken';
const { handleAddUser, getAll, deleteUserByPK, sendCode, enterData, forgetPassword } = userController

router.post('/user', handleAddUser);
router.get('/users', getAll);
router.delete('/user/:username', deleteUserByPK);
router.post('/sendcode', sendCode)
router.get('/enterData', enterData)
router.post('/forgetPassword', forgetPassword);
export default router;