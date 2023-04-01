import React from 'react';
import {queryClient} from './queryClient';
// import {QueryClientProvider} from '@tanstack/react-query';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import AppLayout from "./AppLayout";
import SignIn from './pages/SignIn/SignIn';
import AppNavbar from './components/AppNavbar/AppNavbar';

const Roles = {
    SUPER_ADMIN: 'super admin',
    UNI_TRAINING_OFFICER: 'university training officer',
    TRAINER: 'trainer',
    STUDENT: 'student',
    ADMIN_AND_REGISTRATION: 'administration and registration',
};

const App = () => {

    return (
        <>
        <AppLayout />
        </>
    );
};

export default App;
