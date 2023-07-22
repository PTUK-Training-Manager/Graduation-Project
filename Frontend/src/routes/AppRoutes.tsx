import React, { FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import BlockUI from 'src/containers/BlockUI';
import AppLayout from 'src/containers/AppLayout';
import ProtectedRoute from 'src/routes/ProtectedRoute';

const LandingPage = lazy(() => import('src/pages/LandingPage'));
const Home = lazy(() => import('src/pages/Home/Home'));
const Dashboard = lazy(() => import('src/pages/Dashboard'));
const Login = lazy(() => import('src/pages/Login'));
const NotFound = lazy(() => import('src/pages/NotFound'));
const AccessDenied = lazy(() => import('src/pages/AccessDenied'));
const EditorPlayground = lazy(() => import('src/pages/EditorPlayground'));
const DataGridInfinitePlayground = lazy(
  () => import('src/pages/DataGridInfinitePlayground')
);
const DataGridPaginatedPlayground = lazy(
  () => import('src/pages/DataGridPaginatedPlayground')
);
const InfiniteScrollPlayground = lazy(
  () => import('src/pages/InfiniteScrollPlayground')
);

// university pages
const TrainingRequestForm = lazy(
  () => import('src/pages/university/TrainingRequestForm')
);
const PendingRequets = lazy(
  () => import('src/pages/university/PendingRequests')
);
const Companies = lazy(() => import('src/pages/university/Companies'));
const CompletedTrainees = lazy(
  () => import('src/pages/university/CompletedTrainees')
);

const SubmittedRequests = lazy(
  () => import('src/pages/university/SubmittedStudents')
);
const CurrentTrainees = lazy(
  () => import('src/pages/university/CurrentTrainees')
);

const AllTrainings = lazy(() => import('src/pages/university/AllTrainings'));

// company pages
const AcceptedRequests = lazy(
  () => import('src/pages/company/AcceptedRequests')
);
const EditTraining = lazy(() => import('src/pages/company/EditTraining'));
const Trainers = lazy(() => import('src/pages/company/Trainers'));
const TrainingRequest = lazy(() => import('src/pages/company/TrainingRequest'));
const CompanyCurrentTrainees = lazy(
  () => import('src/pages/company/CurrentTrainees')
);
const CompanyCompletedTrainees = lazy(
  () => import('src/pages/company/CompletedTrainees')
);
const CompanyAllTrainings = lazy(
  () => import('src/pages/company/AllTrainings')
);

// trainer pages
const TrainerCurrentTrainees = lazy(
  () => import('src/pages/trainer/CurrentTrainees')
);
const TrainerAllTrainings = lazy(
  () => import('src/pages/trainer/AllTrainings')
);
const Finished200Hours = lazy(
  () => import('src/pages/trainer/Finished200Hours')
);

const EvaluationRequests = lazy(
  () => import('src/pages/trainer/EvaluationRequests')
);
const TrainerCompletedTrainees = lazy(
  () => import('src/pages/trainer/CompletedTrainees')
);
const AllTrainingStudent = lazy(() => import('src/pages/Student/AllTraining'));
const Progress = lazy(() => import('src/pages/Student/Progress'));

const AddFaculty = lazy(() => import('src/pages/Admin/AddFaculty'));
const Charts = lazy(() => import('src/pages/university/Charts'));
const ForgetPassword = lazy(() => import('src/pages/ForgetPassword'));
const ResetPassword = lazy(() => import('src/pages/resetPassword'));

import { UserRole } from '../constants/auth';

const AppRoutes: FC = () => {
  const { SuperAdmin, UniTrainingOfficer, Company, Trainer, Student } =
    UserRole;

  return (
    <Suspense fallback={<BlockUI isBlocked />}>
      <Routes>
        <Route path="" element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="landing" element={<LandingPage />} />
        <Route path="editor" element={<EditorPlayground />} />
        <Route
          path="data-grid-infinite"
          element={<DataGridInfinitePlayground />}
        />
        <Route
          path="data-grid-paginated"
          element={<DataGridPaginatedPlayground />}
        />
        <Route path="infinite-scroll" element={<InfiniteScrollPlayground />} />
        <Route path="" element={<AppLayout />}>
          <Route path="forget-password" element={<ForgetPassword />} />
        </Route>
        <Route path="me" element={<AppLayout />}>
          {/* <Route path="forget-password" element={<ForgetPassword/>}/> */}

          <Route element={<ProtectedRoute />}>
            <Route index path="" element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={[SuperAdmin]} />}>
            <Route path="processes" element={<AddFaculty />} />
          </Route>

          <Route
            element={<ProtectedRoute allowedRoles={[UniTrainingOfficer]} />}
          >
            <Route path="training-request" element={<TrainingRequestForm />} />
            <Route path="pending-requests" element={<PendingRequets />} />
            <Route path="companies" element={<Companies />} />
            <Route path="all-trainings" element={<AllTrainings />} />
            <Route path="completed-trainees" element={<CompletedTrainees />} />
            <Route path="submitted-trainees" element={<SubmittedRequests />} />
            <Route path="current-trainees" element={<CurrentTrainees />} />
            <Route path="charts" element={<Charts />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={[Trainer]} />}>
            <Route
              path="trainer-current-trainees"
              element={<TrainerCurrentTrainees />}
            />
            <Route
              path="trainer-all-trainings"
              element={<TrainerAllTrainings />}
            />
            <Route path="finished-200-hours" element={<Finished200Hours />} />
            <Route
              path="evaluation-requests"
              element={<EvaluationRequests />}
            />
            <Route
              path="trainer-completed-trainees"
              element={<TrainerCompletedTrainees />}
            />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={[Company]} />}>
            <Route path="accepted-requests" element={<AcceptedRequests />} />
            <Route path="edit-training" element={<EditTraining />} />
            <Route
              path="company-all-trainings"
              element={<CompanyAllTrainings />}
            />
            <Route path="trainers" element={<Trainers />} />
            <Route
              path="company-current-trainees"
              element={<CompanyCurrentTrainees />}
            />
            <Route
              path="company-completed-trainees"
              element={<CompanyCompletedTrainees />}
            />
            <Route path="training-requests" element={<TrainingRequest />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={[Student]} />}>
            <Route path="Progress" element={<Progress />} />

            <Route
              path="all-training-student"
              element={<AllTrainingStudent />}
            />
          </Route>

          <Route path="access-denied" element={<AccessDenied />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
