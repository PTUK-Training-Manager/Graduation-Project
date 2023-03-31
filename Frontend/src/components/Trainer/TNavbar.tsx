import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Drawer } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import { AppBar } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import { IconButton } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import PTUK_Logo from "/assets/PTUK-Logo.png";
import ListItem from '@mui/material/ListItem';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Badge from '@mui/material/Badge';
import "./tstyle.css";
import Typography from '@mui/material/Typography';
import { ImageListItem, Menu } from '@mui/material';
import { Avatar } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
const drawerWidth = 240;


export default function CNavbar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  const handleOpenUserMenu = (event: { currentTarget: React.SetStateAction<any>}): void => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} className='bar'>
        <Toolbar className='tbar'>
        <Box display="flex">
          <ImageListItem>
          <img className='ptuk' src={PTUK_Logo}></img>
          </ImageListItem>
        </Box>
          <Box className="pside">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar 
              sx={{width:56, height:56,}}
              sizes="large"
              alt="avatar"
              src='https://randomuser.me/api/portraits/women/79.jpg'
              >
              </Avatar>
            </IconButton>
          <Menu
              sx={{ mt: '45px' }}
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
              onClose={handleCloseUserMenu}        >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <ListItemButton>
                      <ListItemText primary="Profile">
                      </ListItemText>
                      <AccountBoxIcon />
                      </ListItemButton>
                      <ListItemButton>
                      <ListItemText primary="Logout">
                      </ListItemText>
                      <ExitToAppIcon />
                      </ListItemButton>
                    </Typography>
                </MenuItem>
              
            </Menu>
       </Box>
          </Toolbar>
      </AppBar>
     <Drawer 
     variant="permanent" 
     sx={{width:drawerWidth , flexShrink:0,
      [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
    }}  >
          <Box className='side' sx={{ overflow: 'auto' }}>
        <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
            
                <ListItemText sx={{ml:"1.5rem"}} primary="Evaluation Requests" />
              </ListItemButton>
            </ListItem>
          
        </List>
        <Divider />
        <List>
         
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
               
                <ListItemText sx={{ml:"1.5rem"}} primary="Completed Trainings" />
              </ListItemButton>
            </ListItem>
          
        </List>
        <Divider />
        <List>
         
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
               
                <ListItemText sx={{ml:"1.5rem"}} primary="Current Trainees" />
              </ListItemButton>
            </ListItem>
          
        </List>
        <Divider />
        <List>
         
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
               
                <ListItemText sx={{ml:"1.5rem"}} primary="Completed Trainees" />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
         
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >  
                <ListItemText sx={{ml:"1.5rem"}} primary="Search" />
              </ListItemButton>
            </ListItem>
        </List>
        </Box>
         </Drawer> 
    </Box>
  );
}
