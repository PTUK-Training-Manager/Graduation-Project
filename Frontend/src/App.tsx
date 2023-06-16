import React from 'react';
import AppRoutes from "src/routes";
import Snackbar from "./containers/Snackbar";

const App = () => {

    return (
        <>
            <AppRoutes/>
            <Snackbar/>
        </>
    );
};

export default App;