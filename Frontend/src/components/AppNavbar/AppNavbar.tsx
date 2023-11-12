import React, {FC} from 'react';
import {AppBar, IconButton} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import ImageListItem from "@mui/material/ImageListItem";
import PTUK_CIRCLE from "src/images/assets/ptuk_logo_circle.png";
import PTUK_TEXT from "src/images/assets/ptuk_text.png";
import {NAVBAR_HEIGHT} from "src/constants";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Stack from "@mui/material/Stack";
import useAccountContext from "src/hooks/useAccountContext";
import AccountMenu from "../AccountMenu";
import {isEmptyToken} from "src/utils";

const AppNavbar: FC = () => {

    const {isSidebarOpen, setIsSidebarOpen, isMobile} = useAccountContext();

    const accessToken = localStorage.getItem("access-token");
    const isLoggedIn = !isEmptyToken(accessToken);

    const handleOpenSidebar = () => setIsSidebarOpen((prev) => !prev);


    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: (theme: { zIndex: { drawer: number; }; }) => theme.zIndex.drawer + 1,
                backgroundColor: "primary.light",
                height: NAVBAR_HEIGHT,
                // Uncomment the below if you want the AppSidebar to be beside the AppBar when opened
                // ...(isSidebarOpen && {
                //     width: `calc(100% - ${DRAWER_WIDTH}px)`,
                //     marginLeft: `${DRAWER_WIDTH}px`,
                // }),
            }}
        >

            <Toolbar sx={{height: "100%", justifyContent: "space-between"}}>

                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleOpenSidebar}
                    edge="start"
                    sx={{width: "52px"}}
                >
                    {isSidebarOpen && <ChevronLeftIcon fontSize="small" sx={{
                        marginRight: -0.5,
                        fontSize: "1rem"
                    }}/>}
                    <MenuIcon/>
                </IconButton>

                <Stack
                    direction="row"
                    sx={{
                        height: theme => theme.mixins.toolbar.minHeight,
                        alignItems: "baseline",
                        maxWidth: "275px",
                        gap: 1,
                        mb: 0.5
                    }}
                >
                    {!isMobile && (
                        <>
                            <ImageListItem>
                                <img src={PTUK_CIRCLE} style={{height: 54, width: 54}}></img>
                            </ImageListItem>
                            <ImageListItem sx={{height: "100% !important"}}>
                                <img src={PTUK_TEXT} style={{filter: `brightness(0) invert(1)`}}></img>
                            </ImageListItem>
                        </>
                    )}
                </Stack>

                <Stack direction="row">
                    {/* <LanguageSelector/> */}
                    {isLoggedIn ? (<AccountMenu/>) : <Box/>}
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default AppNavbar;