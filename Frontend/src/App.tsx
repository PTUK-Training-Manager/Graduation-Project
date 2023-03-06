import { Route , Routes } from "react-router-dom";
 import CNavbar from "./components/company/CNavbar";
import EditTraining from "./components/company/EditTraining";
function App() {
  return( 

        <>
        <CNavbar />
        <Routes>
        <Route path='EditTraining' element={<EditTraining />}></Route>
        </Routes>
       </>     
  );
}

export default App;