import React, {FC, lazy, Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import Typography from "@mui/material/Typography";
import BlockUI from "src/containers/BlockUI";
const LandingPage = lazy(() => import("src/pages/LandingPage"));
const Admin = lazy(() => import("src/pages/Admin"));
const Home = lazy(() => import("src/pages/Home"));
const Analytics = lazy(() => import("src/pages/Analytics"));
const Dashboard = lazy(() => import("src/pages/Dashboard"));

const SignIn = lazy(() => import("src/pages/SignIn"));

const SubmitRequest = lazy(() => import("src/pages/university/submitRequest"));
const AddCompany = lazy(() => import("src/pages/university/AddCompany"));
const CompletedTrainees = lazy(() => import("src/pages/university/CompletedTrainees"));
const CurrentTrainees = lazy(() => import("src/pages/university/CurrentTrainees"));
const Search = lazy(() => import("src/pages/university/Search"));
const AddStudent = lazy(() => import("src/pages/university/AddStudent"));




interface AppRoutesProps {}

const AppRoutes: FC<AppRoutesProps> = (props) => {

  return (
      <Suspense fallback={<BlockUI isBlocked/>}>
          <Routes>

              <Route index path="/" element={<SignIn/>}/>
              {/* <Route index path="/" element={<Home/>}/> */}
              <Route index path="/home" element={<Home/>}/>
              <Route path="/admin" element={<Admin/>}/>
              <Route path="/landing" element={<LandingPage/>}/>
              <Route path="/analytics" element={<Analytics/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="*" element={<Typography variant="h1" color="error">404</Typography>}/>

              <Route path="/submitRequest" element={<SubmitRequest/>}/>
              <Route path="/addCompany" element={<AddCompany/>}/>
              <Route path="/completedTrainees" element={<CompletedTrainees/>}/>
              <Route path="/currentTrainees" element={<CurrentTrainees/>}/>
              <Route path="/search" element={<Search/>}/>
              <Route path="/addStudent" element={<AddStudent/>}/>

          </Routes>
      </Suspense>
  );
};

export default AppRoutes;
