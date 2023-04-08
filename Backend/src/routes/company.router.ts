import express from 'express';
const router = express.Router();
import CompanyController from '@controllers/companyController';
const { addCompany, handleAddBranch } = CompanyController

router.post('/company', addCompany);
router.post('/branch', handleAddBranch);

export default router;