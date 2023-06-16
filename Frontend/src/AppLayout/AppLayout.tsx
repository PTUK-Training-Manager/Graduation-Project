import {FC} from 'react';
import AppNavbar from "src/components/AppNavbar";
import Grid from "@mui/material/Grid";
import useStyles from "./styles";
import AppSideDrawerMultiLevel from "src/components/AppSideDrawerMultiLevel";
import {Outlet} from "react-router-dom";
import useAccountContext from "src/hooks/useAccountContext";
import {getContentPaddingLeft} from "src/constants";

const AppLayout: FC = () => {
    const classes = useStyles();
    const {isSidebarOpen} = useAccountContext();

    return (
        <>
            <AppNavbar/>
            <AppSideDrawerMultiLevel/>
            <Grid container className={classes.contentArea} style={{
                paddingLeft: isSidebarOpen ? `${getContentPaddingLeft(isSidebarOpen)}px` : "0px",
            }}>
                <Outlet/>
            </Grid>
        </>
    );
};

export default AppLayout;