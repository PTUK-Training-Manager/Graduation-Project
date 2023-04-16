import express from 'express';
import RequestController from "../controllers/TrainingRequestController";
const router = express.Router();
const {submitRequest,getPendingRequest,deleteRequest}= RequestController

router.post('/request', submitRequest);
router.get('/pendingRequests', getPendingRequest);
router.delete('/request/:id', deleteRequest)

export default router;