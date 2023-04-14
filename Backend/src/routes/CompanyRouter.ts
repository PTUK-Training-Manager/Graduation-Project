import express from 'express';
const router = express.Router();
import CompanyController from '@controllers/CompanyController';
const { addCompany, handleAddBranch, getCompanies, getBranches } = CompanyController

router.post('/company', addCompany);
router.post('/branch', handleAddBranch);
router.get('/company', getCompanies);
router.post('/branches', getBranches);

export default router;