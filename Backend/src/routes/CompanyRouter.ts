import express from 'express';
const router = express.Router();
import CompanyController from '../controllers/CompanyController';
import TrainerController from '../controllers/TrainerController';
import verifyAccessToken from '../middlewares/verifyAccessToken';
import verifyRoles from '../middlewares/verifyRole';
import { UserRoleEnum } from '../enums';
const { addCompany, handleAddBranch, getCompanies, getBranches, getCompanyFields, addFields, getAllFields } = CompanyController

router.use(verifyAccessToken)
router.post('/company', verifyRoles([UserRoleEnum.UNI_TRAINING_OFFICER]), addCompany);
router.post('/branch', verifyRoles([UserRoleEnum.UNI_TRAINING_OFFICER]), handleAddBranch);
router.get('/company', verifyRoles([UserRoleEnum.UNI_TRAINING_OFFICER]), getCompanies);
router.post('/branches', verifyRoles([UserRoleEnum.UNI_TRAINING_OFFICER]), getBranches);
router.get('/trainers', verifyRoles([UserRoleEnum.Company]), TrainerController.getCompanyTrainers)
router.get('/fields', verifyRoles([UserRoleEnum.UNI_TRAINING_OFFICER, UserRoleEnum.Company]), getCompanyFields)
router.get('/allFields', verifyRoles([UserRoleEnum.UNI_TRAINING_OFFICER, UserRoleEnum.Company]), getAllFields)
router.post('/fields', verifyRoles([UserRoleEnum.Company]), addFields)

export default router;