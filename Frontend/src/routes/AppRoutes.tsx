import React, {FC, lazy, Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import BlockUI from "src/containers/BlockUI";
import AppLayout from "src/AppLayout";
import ProtectedRoute from "src/routes/ProtectedRoute";

const LandingPage = lazy(() => import("src/pages/LandingPage"));
const Admin = lazy(() => import("src/pages/Admin"));
const Home = lazy(() => import("src/pages/Home"));
const Analytics = lazy(() => import("src/pages/Analytics"));
const Dashboard = lazy(() => import("src/pages/Dashboard"));
const SignIn = lazy(() => import("src/pages/SignIn"));
const NotFound = lazy(() => import("src/pages/NotFound"));
const AccessDenied = lazy(() => import("src/pages/AccessDenied"));

{ /* university pages */ }
const SubmitRequest = lazy(() => import('src/pages/university/submitRequest'));
const AddCompany = lazy(() => import('src/pages/university/AddCompany'));
const CompletedTrainees = lazy(() => import('src/pages/university/CompletedTrainees'));
const CurrentTrainees = lazy(() => import('src/pages/university/CurrentTrainees'));
const Search = lazy(() => import('src/pages/university/Search'));
const AddStudent = lazy(() => import('src/pages/university/AddStudent'));
const AddBranch = lazy(() => import('src/pages/university/AddBranch'));

{ /* company pages */ }
const AcceptedRequests = lazy(() => import('src/pages/company/AcceptedRequests'));
const EditTraining = lazy(() => import('src/pages/company/EditTraining'));
const Trainers = lazy(() => import('src/pages/company/Trainers'));
const TrainingRequest = lazy(() => import('src/pages/company/TrainingRequest'));

{ /* trainer pages */ }
const EvaluationRequests = lazy(() => import('src/pages/trainer/EvaluationRequests'));
const CompletedTrainings = lazy(() => import('src/pages/trainer/CompletedTrainings'));

import {UserRole} from "../constants/auth";

interface AppRoutesProps {

}

const AppRoutes: FC<AppRoutesProps> = () => {

    return (
        <Suspense fallback={<BlockUI isBlocked/>}>
            <Routes>
                <Route path="signin" element={<SignIn/>}/>
                <Route path="landing" element={<LandingPage/>}/>

                <Route
                    path="/"
                    element={<AppLayout/>}
                >
                    <Route element={<ProtectedRoute/>}>
                        <Route index path="/" element={<Home/>}/>
                        <Route path="dashboard" element={<Dashboard/>}/>
                        <Route path="analytics" element={<Analytics/>}/>
                        <Route path="admin" element={<Admin/>}/>
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={[UserRole.SuperAdmin]}/>}>
                    </Route>

              
                <Route element={<ProtectedRoute allowedRoles={[UserRole.UniTrainingOfficer]}/>}>
                <Route path="/submitRequest" element={<SubmitRequest />} />
          <Route path="/addCompany" element={<AddCompany />} />
          <Route path="/addBranch" element={<AddBranch />} />
          <Route path="/completedTrainees" element={<CompletedTrainees />} />
          <Route path="/currentTrainees" element={<CurrentTrainees />} />
          <Route path="/search" element={<Search />} />
          <Route path="/addStudent" element={<AddStudent />} />
                 </Route>

                 <Route element={<ProtectedRoute allowedRoles={[UserRole.Company]}/>}>
                 <Route path="/acceptedRequests" element={<AcceptedRequests />} />
          <Route path="/editTraining" element={<EditTraining />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/trainingRequests" element={<TrainingRequest />} />
                 </Route>

                <Route path="access-denied" element={<AccessDenied/>}/>
                <Route path="*" element={<NotFound/>}/>
                </Route>

            </Routes>
        </Suspense>
    );
};

export default AppRoutes;