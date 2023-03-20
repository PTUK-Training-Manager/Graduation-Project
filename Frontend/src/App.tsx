import CNavbar from './components/company/CNavbar'
import UNavbar from './components/university/pages/UNavbar'
import TNavbar from './components/Trainer/TNavbar'
import SignIn from './General/SignIn'
import Sign from './General/Sign'
import Gnavbar from './General/Gnavbar'
import AddStudent from './components/university/pages/AddStudent'
import AddCompany from './components/university/pages/AddCompany'
import SubmitRequest from './components/university/pages/SubmitRequest'


const App = () => {
  return (
    <div>
     {/* <CNavbar /> */}
     {/* <UNavbar /> */}
     {/* <TNavbar /> */}
     <SignIn />
     {/* {<Gnavbar />} */}
     {/* { <AddStudent /> } */}
     {/* { <AddCompany /> } */}
     {/* { <SubmitRequest /> } */}
    </div>
  )
}

export default App
