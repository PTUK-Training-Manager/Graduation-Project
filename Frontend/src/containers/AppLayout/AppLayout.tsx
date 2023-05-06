import React, {FC} from 'react';
import Grid from "@mui/material/Grid";
import AppNavbar from "../../components/AppNavbar";
import AppSideDrawerMultiLevel from "../../components/AppSideDrawerMultiLevel";
import BlockUI from "../BlockUI";
import {Outlet} from "react-router-dom";
import {getContentPaddingLeft} from "../../constants";
import useAccountContext from "../../hooks/useAccountContext";
import useVerifyAccessToken from "../../hooks/useVerifyAccessToken";
import useStyles from "src/containers/AppLayout/styles";

const AppLayout: FC = () => {

    const classes = useStyles();
    const {isSidebarOpen} = useAccountContext();

    // const {isVerifying} = useVerifyAccessToken();
    //
    // if (isVerifying) return <BlockUI isBlocked/>;

    return (
        <>
            <AppNavbar/>
            <AppSideDrawerMultiLevel />
            <Grid container className={classes.contentArea} style={{
                paddingLeft: isSidebarOpen ? `${getContentPaddingLeft(isSidebarOpen)}px` : "0px",
            }}>
                <Outlet/>
            </Grid>
        </>
    );
};

export default AppLayout;