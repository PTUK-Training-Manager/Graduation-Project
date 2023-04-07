import express from 'express';
import RequestController from "@controllers/RequestController";
const router = express.Router();

router.post('/request', RequestController.submitRequest);
router.get('/pendingRequests', RequestController.getPendingRequest);
router.delete('/request/:id', RequestController.deleteRequest)

export default router;