import React, {lazy} from "react";
import MUIThemeProvider from "src/styling/MUIThemeProvider";

import CNavbar from './components/company/CNavbar'
import TNavbar from './components/Trainer/TNavbar'
import SignIn from "src/pages/SignIn"
import {queryClient} from "./queryClient";
import {QueryClientProvider} from "@tanstack/react-query";

import Gnavbar from './General/Gnavbar'
import Search from './components/university/pages/Search'
import AddStudent from './components/university/pages/AddStudent'
import AddCompany from './components/university/pages/AddCompany'
import SubmitRequest from './components/university/pages/SubmitRequest'
import CompletedTrainees from './components/university/pages/CompletedTrainees'
import CurrentTrainee from './components/university/pages/CurrentTrainee'
import {Routes, Route, Link} from 'react-router-dom';

const LandingPage = lazy(() => import('src/pages/LandingPage'));
const Home = lazy(() => import('src/pages/Home'));
const Dashboard = lazy(() => import('src/pages/Dashboard'));
const Analytics = lazy(() => import('src/pages/Analytics'));
const Admin = lazy(() => import('src/pages/Admin/Admin'));

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <MUIThemeProvider>
                {/* <CNavbar /> */}
                {/* <UNavbar /> */}
                {/* <TNavbar /> */}
                {/* <SignIn /> */}
                {/* {<Gnavbar />} */}
                {/* { <CurrentTrainee /> } */}
                {/* { <AddStudent /> } */}
                {/* { <AddCompany /> } */}
                {/* { <SubmitRequest /> } */}
                {/* { <CompletedTrainees /> } */}
                {/* { <Search /> } */}


                <Routes>
                    <Route index element={<LandingPage/>}/>
                    <Route path="home" element={<Home/>}/>
                    <Route path="dashboard" element={<Dashboard/>}/>
                    <Route path="analytics" element={<Analytics/>}/>
                    <Route path="admin" element={<Admin/>}/>

                    <Route path="/signin" element={<SignIn/>}/>
                    {/*<Route path="landing" element={<Landing />} />*/}

                    {/*<Route path="admin" element={<Admin />} />*/}
                    <Route path="*" element={<p>There's nothing here: 404!</p>}/>
                </Routes>
            </MUIThemeProvider>
        </QueryClientProvider>
    )
}

export default App
