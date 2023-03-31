import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
  <BrowserRouter>
  <AuthProvider>
    <Routes>
    <Route path="/*" element= { <App /> } />
    </Routes>
    </AuthProvider>
   </BrowserRouter>
   </React.StrictMode>,
);
