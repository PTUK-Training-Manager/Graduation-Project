import React, { useEffect, useState } from 'react';
import {queryClient} from './queryClient';
import {QueryClientProvider} from '@tanstack/react-query';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import AppLayout from "./AppLayout";


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
