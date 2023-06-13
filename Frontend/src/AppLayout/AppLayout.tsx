import {FC} from 'react';
import AppNavbar from "src/components/AppNavbar";
import Grid from "@mui/material/Grid";
import useStyles from "./styles";
import AppSideDrawerMultiLevel from "src/components/AppSideDrawerMultiLevel";
import {Outlet} from "react-router-dom";
import useAccountContext from "src/hooks/useAccountContext";
import {getContentPaddingLeft} from "src/constants";
import useVerifyAccessToken from "src/hooks/useVerifyAccessToken";
import BlockUI from "src/containers/BlockUI";
import {useTranslation} from "react-i18next";

const AppLayout: FC = () => {

    const classes = useStyles();

    const {isSidebarOpen} = useAccountContext();

    const {isVerifying} = useVerifyAccessToken();

    const {i18n} = useTranslation();

    if (isVerifying) return <BlockUI isBlocked/>;

    return (
        <>
            <AppNavbar/>
            <AppSideDrawerMultiLevel/>
            <Grid
                container
                className={classes.contentArea}
                sx={{
                    ...(i18n.dir() === "rtl"
                            ? {paddingRight: isSidebarOpen ? `${getContentPaddingLeft(isSidebarOpen)}px` : "0px"}
                            : {paddingLeft: isSidebarOpen ? `${getContentPaddingLeft(isSidebarOpen)}px` : "0px"}
                    ),
                }}
            >
                <Outlet/>
            </Grid>
        </>
    );
};

export default AppLayout;