import React, {FC} from 'react';
import AppNavbar from "src/components/AppNavbar";

import Grid from "@mui/material/Grid";
import useStyles from "./styles";
import {DRAWER_WIDTH, NAVBAR_HEIGHT} from "src/constants";
import AppSideDrawer from "src/components/AppSideDrawer";
import {useTheme} from "@mui/material/styles";
import AppRoutes from "src/routes";
import useAuth from "src/hooks/useAuth";

interface LayoutProps {
}

// TODO:: Use styled() instead of makeStyles()
const AppLayout: FC<LayoutProps> = () => {

    const classes = useStyles();
    const theme = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const { auth } = useAuth();
    
    const CONTENT_PADDING_LEFT = 24 + (isSidebarOpen ? DRAWER_WIDTH : 0);

    return (
        <>
            <AppNavbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
            <AppSideDrawer isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} roleId={auth?.role} />
            <Grid container className={classes.contentArea} sx={{
                pl: isSidebarOpen ? `${CONTENT_PADDING_LEFT}px` : 3,
            }}>
                <AppRoutes/>
            </Grid>
        </>
    );
};

export default AppLayout;
