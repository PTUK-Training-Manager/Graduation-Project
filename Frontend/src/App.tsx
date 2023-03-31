import CNavbar from './components/company/CNavbar';
import UNavbar from './components/university/pages/UNavbar';
import TNavbar from './components/Trainer/TNavbar';
import SignIn from 'src/pages/SignIn';
import { queryClient } from './queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import Home from './components/Home';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import Search from './components/university/pages/Search';
import AddStudent from './components/university/pages/AddStudent';
import AddCompany from './components/university/pages/AddCompany';
import SubmitRequest from './components/university/pages/SubmitRequest';
import CompletedTrainees from './components/university/pages/CompletedTrainees';
import CurrentTrainee from './components/university/pages/CurrentTrainee';
import Missing from './components/Missing';
import { Route, Routes } from 'react-router-dom';

const Roles = {
  SUPER_ADMIN: 'super admin',
  UNI_TRAINING_OFFICER: 'university training officer',
  TRAINER: 'trainer',
  STUDENT: 'student',
  ADMIN_AND_REGISTRATION: 'administration and registration',
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>

        <Route path="/" element={<UNavbar />}></Route>
        {/* <Route element={<RequireAuth allowedRoles={[Roles.UNI_TRAINING_OFFICER]} />} > */}
        <Route path="/submitRequest" element={<SubmitRequest />}></Route>
        <Route path="/addCompany"    element={<AddCompany />}></Route>
        <Route path="/addStudent" element={<AddStudent />}></Route> 
        {/* <Route path="/completedTrainees" element={<CompletedTrainees />}></Route>
        <Route path="/currentTrainee" element={<CurrentTrainee />}></Route> 
        <Route path="/search" element={<Search />}></Route>
        {/* </Route> */}

      </Routes>
    </QueryClientProvider>
  );
};

export default App;

          {/* <Route path="/" element={<SignIn />} />

          <Route path="unauthorized" element={<Unauthorized />} /> */}

          {/* <Route element={<RequireAuth allowedRoles={[Roles.UNI_TRAINING_OFFICER]} />}>
           <Route path="addCompany" element={<AddCompany />} />
           <Route path="submitRequest" element={<SubmitRequest />} />
           <Route path="completedTrainees" element={<CompletedTrainees />} />
           <Route path="currentTrainee" element={<CurrentTrainee />} />
           <Route path="search" element={<Search />} />
           <Route path="addStudent" element={<AddStudent />} />
         </Route> */}

          {/* <Route path="*" element={<Missing />} />
         */}
       