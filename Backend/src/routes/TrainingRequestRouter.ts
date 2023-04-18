import express from 'express';
import RequestController from "../controllers/TrainingRequestController";
import verifyAccessToken from '../middlewares/verifyAccessToken';
const router = express.Router();
const { submitRequest, getPendingRequest, deleteRequest, getTrainingRequest } = RequestController

router.post('/request', submitRequest);
router.get('/pendingRequests', getPendingRequest);
router.delete('/request/:id', deleteRequest);
//verify access token?
router.get('/trainingRequests', verifyAccessToken, getTrainingRequest);

export default router;