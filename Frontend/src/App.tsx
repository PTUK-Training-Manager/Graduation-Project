import CNavbar from './components/company/CNavbar'
import UNavbar from './components/university/pages/UNavbar'
import TNavbar from './components/Trainer/TNavbar'
import SignIn from './General/SignIn'
import Gnavbar from './General/Gnavbar'
import Search from './components/university/pages/Search'
import AddStudent from './components/university/pages/AddStudent'
import AddCompany from './components/university/pages/AddCompany'
import SubmitRequest from './components/university/pages/SubmitRequest'
import CompletedTrainees from './components/university/pages/CompletedTrainees'
import CurrentTrainee from './components/university/pages/CurrentTrainee'
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
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
     { <Search /> }
    </div>
  )
}

export default App
