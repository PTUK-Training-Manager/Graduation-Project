import express from 'express';
const router = express.Router();
<<<<<<< HEAD
import CompanyController from '@controllers/CompanyController';
const { addCompany, handleAddBranch, getCompanies, getBranches } = CompanyController
=======
import CompanyController from '../controllers/CompanyController';
const { addCompany, handleAddBranch } = CompanyController
>>>>>>> 12d0297e8978d7a087a5d6a22612ff4067de530d

router.post('/company', addCompany);
router.post('/branch', handleAddBranch);
router.get('/company', getCompanies);
router.post('/branches', getBranches);

export default router;