import express from 'express';
import requestController from "src/controllers/submitRequestController";
const router = express.Router();

router.post('/submitRequest',requestController.submitRequest);

export default router;