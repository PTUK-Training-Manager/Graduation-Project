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
                </Route>

                <Route path="access-denied" element={<AccessDenied/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
