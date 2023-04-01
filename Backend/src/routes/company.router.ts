import express from 'express';
const router = express.Router();
import companyController from '@controllers/companyController';

router.post('/addCompany',companyController.addCompany);

export default router;