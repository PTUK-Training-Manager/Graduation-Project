import React, {FC, lazy, Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import Typography from "@mui/material/Typography";
import BlockUI from "src/containers/BlockUI";
const LandingPage = lazy(() => import("src/pages/LandingPage"));
const Admin = lazy(() => import("src/pages/Admin"));
const Home = lazy(() => import("src/pages/Home"));
const Analytics = lazy(() => import("src/pages/Analytics"));
const Dashboard = lazy(() => import("src/pages/Dashboard"));

interface AppRoutesProps {}

const AppRoutes: FC<AppRoutesProps> = (props) => {

  return (
      <Suspense fallback={<BlockUI isBlocked/>}>
          <Routes>
              <Route index path="/" element={<Home/>}/>
              <Route index path="/home" element={<Home/>}/>
              <Route path="/admin" element={<Admin/>}/>
              <Route path="/landing" element={<LandingPage/>}/>
              <Route path="/analytics" element={<Analytics/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="*" element={<Typography variant="h1" color="error">404</Typography>}/>
          </Routes>
      </Suspense>
  );
};

export default AppRoutes;
