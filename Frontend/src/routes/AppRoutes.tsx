import React, { FC, lazy, Suspense } from 'react';
import { Route, Routes,useNavigate } from 'react-router-dom';
import RequireAuth from '../components/RequireAuth';
import Typography from '@mui/material/Typography';
import BlockUI from 'src/containers/BlockUI';

const LandingPage = lazy(() => import('src/pages/LandingPage'));
const Admin = lazy(() => import('src/pages/Admin'));
const Home = lazy(() => import('src/pages/Home'));
const Analytics = lazy(() => import('src/pages/Analytics'));
const Dashboard = lazy(() => import('src/pages/Dashboard'));
const Unauthorized = lazy(() => import('src/components/Unauthorized'));

const SignIn = lazy(() => import('src/pages/SignIn'));

{ /* university pages */ }
const SubmitRequest = lazy(() => import('src/pages/university/submitRequest'));
const AddCompany = lazy(() => import('src/pages/university/AddCompany'));
const CompletedTrainees = lazy(() => import('src/pages/university/CompletedTrainees'));
const CurrentTrainees = lazy(() => import('src/pages/university/CurrentTrainees'));
const Search = lazy(() => import('src/pages/university/Search'));
const AddStudent = lazy(() => import('src/pages/university/AddStudent'));

{ /* company pages */ }
const AcceptedRequests = lazy(() => import('src/pages/company/AcceptedRequests'));
const EditTraining = lazy(() => import('src/pages/company/EditTraining'));
const Trainers = lazy(() => import('src/pages/company/Trainers'));
const TrainingRequest = lazy(() => import('src/pages/company/TrainingRequest'));

{ /* trainer pages */ }
const EvaluationRequests = lazy(() => import('src/pages/trainer/EvaluationRequests'));
const CompletedTrainings = lazy(() => import('src/pages/trainer/CompletedTrainings'));

{ /*Roles for Actors */ }
export const ROLES = {
  university: 4,
  trainer: 5,
  company: 6,
};

interface RouteConfig {
  path: string;
  element: JSX.Element;
  allowedRoles: number;
}

{ /* Trainer Routes */ }
const Trainer_ROUTES: RouteConfig[] = [
  {
    path: '/evaluationRequests',
    element: <EvaluationRequests />,
    allowedRoles: ROLES.trainer,
  },
  {
    path: '/completedTrainings',
    element: <CompletedTrainings />,
    allowedRoles: ROLES.trainer,
  },
];

interface AppRoutesProps {}

const AppRoutes: FC<AppRoutesProps> = (props) => {
  const navigate = useNavigate();
  const handleRouteClick = (routePath: string) => {
    navigate(routePath);
  }
  return (
    <Suspense fallback={<BlockUI isBlocked />}>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route index path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="*"
          element={
            <Typography variant="h1" color="error">
              404
            </Typography>
          }
        />
 <Route path="/signIn" element={<SignIn />} />

        {/* University Routes */}
        <Route element={<RequireAuth allowedRoles={ROLES.university} />}>
          <Route path="/submitRequest" element={<SubmitRequest />} />
          <Route path="/addCompany" element={<AddCompany />} />
          <Route path="/completedTrainees" element={<CompletedTrainees />} />
          <Route path="/currentTrainees" element={<CurrentTrainees />} />
          <Route path="/search" element={<Search />} />
          <Route path="/addStudent" element={<AddStudent />} />
        </Route>

        {/* Company Routes */}
        <Route element={<RequireAuth allowedRoles={ROLES.company} />}>
          <Route path="/acceptedRequests" element={<AcceptedRequests />} />
          <Route path="/editTraining" element={<EditTraining />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/trainingRequests" element={<TrainingRequest />} />
        </Route>

        {/* TRainer routes */}
        {Trainer_ROUTES.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <RequireAuth allowedRoles={route.allowedRoles}>
                {route.element}
              </RequireAuth>
            }
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

{
  /* <Route element={<RequireAuth allowedRoles={ROLES.trainer} />} >
          <Route path="/evaluationRequests" element={<EvaluationRequests />} />
          <Route path="/completedTrainings" element={<CompletedTrainings />} />
          </Route> */
}
