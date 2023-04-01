import express from 'express';
import requestController from "@controllers/RequestController";
const router = express.Router();

router.post('/submitRequest',requestController.submitRequest);
router.get('/pendingRequest',requestController.viewPendingRequest);
router.delete('/deleteRequestById/:id',requestController.deleteRequest)

export default router;