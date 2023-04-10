import React, { useState } from 'react';
import {queryClient} from './queryClient';
import {QueryClientProvider} from '@tanstack/react-query';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import AppLayout from "./AppLayout";
import SignIn from './pages/SignIn/SignIn';
import AppNavbar from './components/AppNavbar/AppNavbar';
import jwtDecode from 'jwt-decode';

//userData =to know if this user is logged in
const [userData,setUserData]=useState(null);
function getUserData(){
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        console.log(accessToken);
        // setUserData(decodedToken) ; 

    } else {
        console.error('Access token is null');
    }
}
const App = () => {

    return (
        <>
        <QueryClientProvider client={queryClient}>
        <AppLayout />
        </QueryClientProvider>
        </>
    );
};

export default App;
