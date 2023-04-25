import React from 'react';
import AppRoutes from "src/routes";
import Snackbar from "./containers/Snackbar";
import useVerifyAccessToken from "src/hooks/useVerifyAccessToken";
import BlockUI from "src/containers/BlockUI";
import AppLayout from './AppLayout/AppLayout';

const App = () => {

    const {isVerifying} = useVerifyAccessToken();

    if (isVerifying) return <BlockUI isBlocked/>;

    return (
        <>
            <AppRoutes/>
            <Snackbar/>
        </>
    );
};

export default App;