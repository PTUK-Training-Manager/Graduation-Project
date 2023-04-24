import React, {FC} from 'react';
import Drawer from "@mui/material/Drawer";
import {DRAWER_WIDTH} from "src/constants";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ContactPageIcon from '@mui/icons-material/ContactPage';
import {grey} from "@mui/material/colors";
import DrawerHeader from "./DrawerHeader";
import {useNavigate} from "react-router-dom";
import useAccountContext from "src/hooks/useAccountContext";
import { UserRole } from 'src/constants/auth';
import { SignInResponse } from 'src/pages/SignIn/api/response.dto';

interface AppSideDrawerProps {
    roleId: number | null;
  }

  const AppSideDrawer: FC<AppSideDrawerProps> = ({
    roleId,
  }) => {

    const navigate = useNavigate();

    const {isSidebarOpen: isOpen} = useAccountContext();


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
                }}
                variant="persistent"
                open={isOpen}
            >
                <DrawerHeader/> {/* Necessary for the drawer content to be below the app bar */}
                <List>
                  {/* University pages which appear in sidebar */}
          {roleId === UserRole.UniTrainingOfficer && (
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
                <ListItemButton onClick={() => navigate('/pendingRequests')}>
                  <ListItemIcon sx={{ color: grey[100] }}>
                    <ContactPageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Pending Requests" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/submittedStudents')}>
                  <ListItemIcon sx={{ color: grey[100] }}>
                    <ContactPageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Submitted Students" />
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
                <ListItemButton onClick={() => navigate('/addBranch')}>
                  <ListItemIcon sx={{ color: grey[100] }}>
                    <ContactPageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Branch" />
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
           
                  {/* Company pages which appear in sidebar */}
          {roleId === UserRole.Company && (
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
                <ListItemButton onClick={() => navigate('/ccurrentTrainees')}>
                  <ListItemIcon sx={{ color: grey[100] }}>
                    <ContactPageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Current trainees" />
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
                            {/* Trainer pages which appear in sidebar */}
          {roleId === UserRole.Trainer && (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/evaluationRequests')}>
                  <ListItemIcon sx={{ color: grey[100] }}>
                    <ContactPageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Evaluation Requests" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/completedTrainings')}>
                  <ListItemIcon sx={{ color: grey[100] }}>
                    <ContactPageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Completed Trainings" />
                </ListItemButton>
              </ListItem>
            </>
          )}
                  {/* General pages which appear in sidebar */}
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('Analytics')}>
                <ListItemIcon sx={{ color: grey[100] }}>
                  <ContactPageIcon />
                </ListItemIcon>
                <ListItemText primary="Analytics" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('Dashboard')}>
                <ListItemIcon sx={{ color: grey[100] }}>
                  <ContactPageIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
          </>
        </List>
      </Drawer>
    </nav>
  );
};
export default AppSideDrawer;