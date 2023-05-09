import React, {FC, lazy, Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import BlockUI from "src/containers/BlockUI";
import AppLayout from "src/containers/AppLayout";
import ProtectedRoute from "src/routes/ProtectedRoute";

const LandingPage = lazy(() => import("src/pages/LandingPage"));
const Admin = lazy(() => import("src/pages/Admin"));
const Home = lazy(() => import("src/pages/Home"));
const Dashboard = lazy(() => import("src/pages/Dashboard"));
const Login = lazy(() => import("src/pages/Login"));
const NotFound = lazy(() => import("src/pages/NotFound"));
const AccessDenied = lazy(() => import("src/pages/AccessDenied"));
const EditorPlayground = lazy(() => import("src/pages/EditorPlayground"));

// university pages
const TrainingRequestForm = lazy(() => import('src/pages/university/TrainingRequestForm'));
const AddCompanyForm = lazy(() => import('src/pages/university/AddCompanyForm'));
const CompletedTrainees = lazy(() => import('src/pages/university/CompletedTrainees'));
const CurrentTrainees = lazy(() => import('src/pages/university/CurrentTrainees'));
const AllTrainings = lazy(() => import('src/pages/university/AllTrainings'));
const AddStudentForm = lazy(() => import('src/pages/university/AddStudentForm/AddStudentForm'));
const AddBranchForm = lazy(() => import('src/pages/university/AddBranchForm'));

// company pages
const AcceptedRequests = lazy(() => import('src/pages/company/AcceptedRequests'));
const EditTraining = lazy(() => import('src/pages/company/EditTraining'));
const Trainers = lazy(() => import('src/pages/company/Trainers'));
const TrainingRequest = lazy(() => import('src/pages/company/TrainingRequest'));

// trainer pages
// const EvaluationRequests = lazy(() => import('src/pages/trainer/EvaluationRequests'));
// const CompletedTrainings = lazy(() => import('src/pages/trainer/CompletedTrainings'));

import {UserRole} from "../constants/auth";

interface AppRoutesProps {
}

const AppRoutes: FC<AppRoutesProps> = () => {

    const {SuperAdmin, UniTrainingOfficer, Company} = UserRole;

    return (
        <Suspense fallback={<BlockUI isBlocked/>}>
            <Routes>
                {/* <Route index path="/" element={<Home/>}/> */}
                <Route path="login" element={<Login/>}/>
                <Route path="landing" element={<LandingPage/>}/>
                <Route path="editor" element={<EditorPlayground/>}/>

                <Route path="/" element={<AppLayout/>}>
                    <Route element={<ProtectedRoute/>}>
                        <Route index path="/" element={<Home/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/admin" element={<Admin/>}/>
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={[SuperAdmin]}/>}/>

                    <Route element={<ProtectedRoute allowedRoles={[UniTrainingOfficer, Company]}/>}>
                        <Route path="/all-trainings" element={<AllTrainings/>}/>
                        <Route path="/add-student" element={<AddStudentForm/>}/>
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={[UniTrainingOfficer]}/>}>
                        <Route path="/training-request" element={<TrainingRequestForm/>}/>
                        <Route path="/add-company" element={<AddCompanyForm/>}/>
                        <Route path="/add-branch" element={<AddBranchForm/>}/>
                        <Route path="/completed-trainees" element={<CompletedTrainees/>}/>
                        <Route path="/current-trainees" element={<CurrentTrainees/>}/>
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={[Company]}/>}>
                        <Route path="/accepted-requests" element={<AcceptedRequests/>}/>
                        <Route path="/edit-training" element={<EditTraining/>}/>
                        <Route path="/trainers" element={<Trainers/>}/>
                        <Route path="/training-requests" element={<TrainingRequest/>}/>
                    </Route>

                    <Route path="access-denied" element={<AccessDenied/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;