import React, { FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import BlockUI from 'src/containers/BlockUI';
import AppLayout from 'src/AppLayout';
import ProtectedRoute from 'src/routes/ProtectedRoute';

const LandingPage = lazy(() => import('src/pages/LandingPage'));
const Admin = lazy(() => import('src/pages/Admin'));
const Home = lazy(() => import('src/pages/Home'));
const Analytics = lazy(() => import('src/pages/Analytics'));
const Dashboard = lazy(() => import('src/pages/Dashboard'));
const Login = lazy(() => import('src/pages/Login'));
const NotFound = lazy(() => import('src/pages/NotFound'));
const AccessDenied = lazy(() => import('src/pages/AccessDenied'));

{
  /* university pages */
}
const TrainingRequestForm = lazy(
  () => import('src/pages/university/TrainingRequestForm')
);
const PendingRequets = lazy(
  () => import('src/pages/university/PendingRequests')
);
const AddCompanyForm = lazy(
  () => import('src/pages/university/AddCompanyForm')
);
const CompletedTrainees = lazy(
  () => import('src/pages/university/CompletedTrainees')
);
const CurrentTrainees = lazy(
  () => import('src/pages/university/CurrentTrainees')
);
const AllTrainings = lazy(() => import('src/pages/university/AllTrainings'));
const AddStudent = lazy(() => import('src/pages/university/AddStudent'));
const AddBranchForm = lazy(() => import('src/pages/university/AddBranchForm'));
const SubmittedStudents = lazy(
  () => import('src/pages/university/SubmittedStudents')
);

{
  /* company pages */
}
const AcceptedRequests = lazy(
  () => import('src/pages/company/AcceptedRequests')
);
const EditTraining = lazy(() => import('src/pages/company/EditTraining'));
const Trainers = lazy(() => import('src/pages/company/Trainers'));
const TrainingRequest = lazy(() => import('src/pages/company/TrainingRequest'));
const CompanyCurrentTrainees = lazy(
  () => import('src/pages/company/CurrentTrainees')
);

{
  /* trainer pages */
}
const EvaluationRequests = lazy(
  () => import('src/pages/trainer/EvaluationRequests')
);
const CompletedTrainings = lazy(
  () => import('src/pages/trainer/CompletedTrainings')
);

import { UserRole } from '../constants/auth';

interface AppRoutesProps {}

const AppRoutes: FC<AppRoutesProps> = () => {
  return (
    <Suspense fallback={<BlockUI isBlocked />}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="landing" element={<LandingPage />} />

        <Route path="/" element={<AppLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route index path="/" element={<Home />} />
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route
            element={<ProtectedRoute allowedRoles={[UserRole.SuperAdmin]} />}
          />

          <Route
            element={
              <ProtectedRoute allowedRoles={[UserRole.UniTrainingOfficer]} />
            }
          >
            <Route path="/training-request" element={<TrainingRequestForm />} />
            <Route path="/pending-requests" element={<PendingRequets />} />
            <Route path="/add-company" element={<AddCompanyForm />} />
            <Route path="/add-branch" element={<AddBranchForm />} />
            <Route path="/completed-trainees" element={<CompletedTrainees />} />
            <Route path="/submitted-students" element={<SubmittedStudents />} />
            <Route path="/current-trainees" element={<CurrentTrainees />} />
            <Route path="/all-trainings" element={<AllTrainings />} />
            <Route path="/add-student" element={<AddStudent />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={[UserRole.Company]} />}>
            <Route path="/acceptedRequests" element={<AcceptedRequests />} />
            <Route path="/editTraining" element={<EditTraining />} />
            <Route
              path="/ccurrentTrainees"
              element={<CompanyCurrentTrainees />}
            />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/trainingRequests" element={<TrainingRequest />} />
          </Route>

          <Route path="access-denied" element={<AccessDenied />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
