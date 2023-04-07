import React, { FC, useEffect, useState } from 'react';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import useStyles from './styles';
import { DRAWER_WIDTH } from 'src/constants';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { grey } from '@mui/material/colors';
import DrawerHeader from './DrawerHeader';
import { useNavigate, useLocation } from 'react-router-dom';
import SignInState from 'src/pages/SignIn';
import { signIn } from 'src/pages/SignIn/api';
import { ROLES } from 'src/routes/AppRoutes';
import useAuth from "src/hooks/useAuth";



interface AppSideDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  roleId: number | null;
  handleRouteClick: (routePath: string) => void;
}

const AppSideDrawer: FC<AppSideDrawerProps> = ({
  isOpen,
  setIsOpen,
  roleId,
  handleRouteClick
}) => {
  const theme = useTheme();

  const classes = useStyles();

  const navigate = useNavigate();

  const handleDrawerClose = () => setIsOpen(false);
 

  return (
    <nav>
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0, // don't shrink when the window is too small
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            // backgroundColor: "#1E1E1E",
            backgroundColor: grey[800],
            color: grey[100],
          },
          // display: isOpen ? "block" : "none"
          // transform: !isOpen && `translateX(-100%)`
        }}
        variant="persistent"
        open={isOpen}
      >
        <DrawerHeader />{' '}
        {/* Necessary for the drawer content to be below the app bar */}
        <List>
          {roleId === ROLES.university && (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/submitRequest')}>
                  <ListItemIcon sx={{ color: grey[100] }}>
                    <ContactPageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Submit Request" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/addCompany')}>
                  <ListItemIcon sx={{ color: grey[100] }}>
                    <ContactPageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add company" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/currentTrainees')}>
                  <ListItemIcon sx={{ color: grey[100] }}>
                    <ContactPageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Current trainees" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/completedTrainees')}>
                  <ListItemIcon sx={{ color: grey[100] }}>
                    <ContactPageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Completed trainees" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/search')}>
                  <ListItemIcon sx={{ color: grey[100] }}>
                    <ContactPageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Search" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/addstudent')}>
                  <ListItemIcon sx={{ color: grey[100] }}>
                    <ContactPageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Student" />
                </ListItemButton>
              </ListItem>
            </>
          )}


          {roleId === ROLES.company && (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/acceptedRequests')}>
                  <ListItemIcon sx={{ color: grey[100] }}>
                    <ContactPageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Accepted Requests" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/trainingRequests')}>
                  <ListItemIcon sx={{ color: grey[100] }}>
                    <ContactPageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Training Requests" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/trainers')}>
                  <ListItemIcon sx={{ color: grey[100] }}>
                    <ContactPageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Trainers" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/EditTraining')}>
                  <ListItemIcon sx={{ color: grey[100] }}>
                    <ContactPageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Edit Training" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/search')}>
                  <ListItemIcon sx={{ color: grey[100] }}>
                    <ContactPageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Search" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/addstudent')}>
                  <ListItemIcon sx={{ color: grey[100] }}>
                    <ContactPageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Student" />
                </ListItemButton>
              </ListItem>
            </>
          )}

          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/dashboard')}>
                <ListItemIcon sx={{ color: grey[100] }}>
                  <ContactPageIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/landing')}>
                <ListItemIcon sx={{ color: grey[100] }}>
                  <ContactPageIcon />
                </ListItemIcon>
                <ListItemText primary="LandingPage" />
              </ListItemButton>
            </ListItem>
          </>
        </List>
      </Drawer>
    </nav>
  );
};

export default AppSideDrawer;
