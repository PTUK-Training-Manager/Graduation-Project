import CNavbar from './components/company/CNavbar'
import UNavbar from './components/university/UNavbar'
import TNavbar from './components/Trainer/TNavbar'
import SignIn from "src/pages/SignIn"
import {queryClient} from "./queryClient";
import {QueryClientProvider} from "@tanstack/react-query";

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            {/*<CNavbar/>*/}
            {/*<UNavbar/>*/}
            {/*<TNavbar/>*/}
            <SignIn/>
        </QueryClientProvider>
    )
}

export default App
