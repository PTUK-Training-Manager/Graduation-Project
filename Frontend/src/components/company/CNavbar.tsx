import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuItem from '@mui/material/MenuItem';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ListItemButton from '@mui/material/ListItemButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Badge from '@mui/material/Badge';
import "./style.css";
import {useState} from 'react';
import Typography from '@mui/material/Typography';
import {ImageListItem, Menu, Theme} from '@mui/material';
import {Avatar} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {AppBarProps} from './AppBarProps';
import PTUK_Logo from "../../assets/PTUK-Logo.png";

const drawerWidth = 240;


const openedMixin = (theme: Theme): Object => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): Object => {
    return ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    });
};

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const [anchorEl, setAanchorEl] = useState(null)

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event: React.MouseEvent<any>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (

        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar open={open} className='bar'>
                <Toolbar className='tbar'>
                    <Box display="flex">
                        <ImageListItem style={{height: "64px"}}>
                            <img src={PTUK_Logo}></img>
                        </ImageListItem>
                    </Box>
                    <Box className="pside">
                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                            <Avatar
                                sizes="large"
                                alt="avatar"
                                src='https://randomuser.me/api/portraits/women/79.jpg'
                            >
                            </Avatar>
                        </IconButton>
                        <Menu
                            sx={{mt: '45px'}}
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
                            onClose={handleCloseUserMenu}>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">
                                    <ListItemButton>
                                        <ListItemText primary="Profile">
                                        </ListItemText>
                                        <AccountBoxIcon/>
                                    </ListItemButton>
                                    <ListItemButton>
                                        <ListItemText primary="Logout">
                                        </ListItemText>
                                        <ExitToAppIcon/>
                                    </ListItemButton>
                                </Typography>
                            </MenuItem>

                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <Box className="side">
                    <List>
                        <ListItem disablePadding sx={{display: 'block'}}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >

                                <ListItemText primary="Training Requests"/>
                                <Badge badgeContent={6} max={999}>
                                    <MailIcon/>
                                </Badge>
                            </ListItemButton>
                        </ListItem>

                    </List>
                    <Divider/>
                    <List>

                        <ListItem disablePadding sx={{display: 'block'}}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >

                                <ListItemText primary="Trainers"/>
                            </ListItemButton>
                        </ListItem>

                    </List>
                    <Divider/>
                    <List>

                        <ListItem disablePadding sx={{display: 'block'}}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >

                                <ListItemText primary="Current Trainee"/>
                            </ListItemButton>
                        </ListItem>

                    </List>
                    <Divider/>
                    <List>

                        <ListItem disablePadding sx={{display: 'block'}}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >

                                <ListItemText primary="Completed Trainee"/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider/>
                    <List>

                        <ListItem disablePadding sx={{display: 'block'}}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >

                                <ListItemText primary="Search"/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider/>
                    <List>

                        <ListItem disablePadding sx={{display: 'block'}}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >

                                <ListItemText primary="Accepted Requests"/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider/>
                    <List>

                        <ListItem disablePadding sx={{display: 'block'}}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >

                                <ListItemText primary="Edit Training"/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <DrawerHeader/>

            </Box>
        </Box>
    );
}
