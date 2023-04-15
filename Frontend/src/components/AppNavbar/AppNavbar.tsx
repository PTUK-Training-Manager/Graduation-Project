import React, {FC} from 'react';
import {AppBar, Avatar, IconButton} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import ImageListItem from "@mui/material/ImageListItem";
import PTUK_CIRCLE from "src/images/assets/ptuk_logo_circle.png";
import PTUK_TEXT from "src/images/assets/ptuk_text.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {NAVBAR_HEIGHT} from "src/constants";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Stack from "@mui/material/Stack";
import useAccountContext from "src/hooks/useAccountContext";

interface AppNavbarProps {
    // isSidebarOpen: boolean;
    // setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppNavbar: FC<AppNavbarProps> = () => {

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const {user, onLogout, isSidebarOpen, setIsSidebarOpen} = useAccountContext();

    const handleOpenUserMenu = (event: {
        currentTarget: React.SetStateAction<any>;
    }): void => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleDrawerOpen = () => setIsSidebarOpen((prev) => !prev);

    const handleLogout = () => {
        if (user) onLogout();
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
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
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{width: "52px"}}
                >
                    {isSidebarOpen && <ChevronLeftIcon fontSize="small" sx={{
                        marginRight: -0.5,
                        fontSize: "1rem"
                    }}/>}
                    <MenuIcon/>
                </IconButton>
                <Stack direction="row"
                       sx={{height: NAVBAR_HEIGHT, alignItems: "baseline", maxWidth: "275px", gap: 1, mb: 0.5}}>
                    <ImageListItem>
                        <img src={PTUK_CIRCLE} style={{height: 54, width: 54}}></img>
                    </ImageListItem>
                    <ImageListItem>
                        <img src={PTUK_TEXT} style={{filter: `brightness(0) invert(1)`}}></img>
                    </ImageListItem>
                </Stack>
                <Box>
                    {user && (
                        <>
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar
                                    sizes="large"
                                    alt="avatar"
                                    src="https://randomuser.me/api/portraits/women/79.jpg"
                                ></Avatar>
                            </IconButton><Menu
                            // sx={{mt: '0.3125rem'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">
                                    <ListItemButton>
                                        <ListItemText primary="Profile"/>
                                        <AccountBoxIcon/>
                                    </ListItemButton>
                                    <ListItemButton onClick={handleLogout}>
                                        <ListItemText primary="Logout"/>
                                        <ExitToAppIcon/>
                                    </ListItemButton>
                                </Typography>
                            </MenuItem>
                        </Menu>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
        ;
};

export default AppNavbar;