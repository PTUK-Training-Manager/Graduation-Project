import React, {FC} from 'react';
import Drawer from "@mui/material/Drawer";
import DrawerHeader from "src/components/AppSideDrawer/DrawerHeader";
import useAccountContext from "src/hooks/useAccountContext";
import useStyles from "./styles";
import AppMenu from "../AppMenu";
import useMediaQuery from '@mui/material/useMediaQuery';

const AppSideDrawerMultiLevel: FC = () => {
    const {isSidebarOpen} = useAccountContext();

    const classes = useStyles();

    const isMobileViewport = useMediaQuery('(max-width:600px)');

    return (
        <Drawer
            className={classes.drawer}
            variant={isMobileViewport ? "temporary" : "persistent"}
            open={isSidebarOpen}
        >
            <DrawerHeader/> {/* Necessary for the drawer content to be below the app bar */}
            <AppMenu/>
        </Drawer>
    );
};

export default AppSideDrawerMultiLevel;
