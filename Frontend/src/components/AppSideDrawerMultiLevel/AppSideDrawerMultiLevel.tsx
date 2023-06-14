import React, {FC} from 'react';
import Drawer from "@mui/material/Drawer";
import DrawerHeader from "src/components/AppSideDrawer/DrawerHeader";
import useAccountContext from "src/hooks/useAccountContext";
import useStyles from "./styles";
import AppMenu from "../AppMenu";

interface AppSideDrawerMultiLevelProps {}

const AppSideDrawerMultiLevel: FC<AppSideDrawerMultiLevelProps> = () => {
    const {isSidebarOpen} = useAccountContext();

    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            open={isSidebarOpen}
        >
            <DrawerHeader/> {/* Necessary for the drawer content to be below the app bar */}
            <AppMenu/>
        </Drawer>
    );
};

export default AppSideDrawerMultiLevel;
