import React, {FC} from 'react';
import {useLocation} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import {AppBar, Avatar, IconButton} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import ImageListItem from "@mui/material/ImageListItem";
import PTUK_Logo from "src/images/assets/PTUK-Logo.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

interface NavbarProps {
}

const Navbar: FC<NavbarProps> = (props) => {
    const location = useLocation();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event: {
        currentTarget: React.SetStateAction<any>;
    }): void => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: "#30ADD1",
                height: "75px"
            }}
        >
            <Toolbar
                // className="tbar"
                sx={{
                    justifyContent: "space-between",
                }}
            >
                <Box display="flex" sx={{height: "100%", py: 0.5}}>
                    <ImageListItem>
                        <img className="ptuk" src={PTUK_Logo}></img>
                    </ImageListItem>
                </Box>
                <Box
                    // className="pside"
                >
                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                        <Avatar
                            sx={{width: '3.5rem', height: '3.5rem'}}
                            sizes="large"
                            alt="avatar"
                            src="https://randomuser.me/api/portraits/women/79.jpg"
                        ></Avatar>
                    </IconButton>
                    <Menu
                        sx={{mt: '0.3125rem'}}
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
                                    <ListItemText primary="Profile"></ListItemText>
                                    <AccountBoxIcon/>
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="Logout"></ListItemText>
                                    <ExitToAppIcon/>
                                </ListItemButton>
                            </Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
