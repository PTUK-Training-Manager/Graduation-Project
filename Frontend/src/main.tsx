import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {AccountProvider} from 'src/context/AccountContext';
import SnackbarProvider from "./context/SnackbarContext";
import {queryClient} from "src/queryClient";
import {QueryClientProvider} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MUIThemeProvider from "src/styling/MUIThemeProvider";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <MUIThemeProvider>
                <QueryClientProvider client={queryClient}>
                    <SnackbarProvider>
                        <AccountProvider>
                            <Routes>
                                <Route path="/*" element={<App/>}/>
                            </Routes>
                        </AccountProvider>
                    </SnackbarProvider>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </MUIThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
);