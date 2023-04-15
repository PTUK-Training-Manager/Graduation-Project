import React, {FC} from 'react';
import AppNavbar from "src/components/AppNavbar";
import Grid from "@mui/material/Grid";
import useStyles from "./styles";
import AppSideDrawer from "src/components/AppSideDrawer";
import {Outlet} from "react-router-dom";
import useAccountContext from "src/hooks/useAccountContext";
import {getContentPaddingLeft} from "src/constants";

const AppLayout: FC = () => {

    const classes = useStyles();
    const {isSidebarOpen,user} = useAccountContext();

    return (
        <>
            <AppNavbar/>
            {user && <AppSideDrawer roleId={user.roleId}/>}
            <Grid container className={classes.contentArea} style={{
                paddingLeft: isSidebarOpen ? `${getContentPaddingLeft(isSidebarOpen)}px` : "24px",
            }}>
                <Outlet/>
            </Grid>
        </>
    );
};

export default AppLayout;