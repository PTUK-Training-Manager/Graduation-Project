import React, {FC} from 'react';
import Drawer from "@mui/material/Drawer";
import DrawerHeader from "src/components/AppSideDrawer/DrawerHeader";
import useAccountContext from "src/hooks/useAccountContext";
import useStyles from "./styles";
import AppMenu from "../AppMenu";
import {useTranslation} from "react-i18next";

interface AppSideDrawerMultiLevelProps {
}

const AppSideDrawerMultiLevel: FC<AppSideDrawerMultiLevelProps> = () => {
    const {isSidebarOpen, isMobile} = useAccountContext();

    const classes = useStyles();

    // @ts-ignore
    const {i18n} = useTranslation();

    return (
        <Drawer
            className={classes.drawer}
            variant={isMobile ? "temporary" : "persistent"}
            open={isSidebarOpen}
            anchor={i18n.dir() === "rtl" ? "right" : "left"}
        >
            <DrawerHeader/> {/* Necessary for the drawer content to be below the app bar */}
            <AppMenu/>
        </Drawer>
    );
};

export default AppSideDrawerMultiLevel;
