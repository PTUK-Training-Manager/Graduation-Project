import express from 'express';
const router = express.Router();
import CompanyController from '../controllers/CompanyController';
import TrainerController from '../controllers/TrainerController';
import verifyAccessToken from '../middlewares/verifyAccessToken';
const { addCompany, handleAddBranch, getCompanies, getBranches } = CompanyController

router.post('/company', addCompany);
router.post('/branch', handleAddBranch);
router.get('/company', getCompanies);
router.post('/branches', getBranches);
router.get('/trainers',verifyAccessToken,TrainerController.getMyTrainers)

export default router;