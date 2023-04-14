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



const AppSideDrawer: FC = () => {

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
                    // display: isOpen ? "block" : "none"
                    // transform: !isOpen && `translateX(-100%)`
                }}
                variant="persistent"
                open={isOpen}
            >
                <DrawerHeader/> {/* Necessary for the drawer content to be below the app bar */}
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/analytics")}>
                            <ListItemIcon sx={{color: grey[100]}}><ContactPageIcon/></ListItemIcon>
                            <ListItemText primary="Submit Request"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/admin")}>
                            <ListItemIcon sx={{color: grey[100]}}><ContactPageIcon/></ListItemIcon>
                            <ListItemText primary="Add company"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/dashboard")}>
                            <ListItemIcon sx={{color: grey[100]}}><ContactPageIcon/></ListItemIcon>
                            <ListItemText primary="Current trainees"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/analytics")}>
                            <ListItemIcon sx={{color: grey[100]}}><ContactPageIcon/></ListItemIcon>
                            <ListItemText primary="Completed trainees"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/admin")}>
                            <ListItemIcon sx={{color: grey[100]}}><ContactPageIcon/></ListItemIcon>
                            <ListItemText primary="Search"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/dashboard")}>
                            <ListItemIcon sx={{color: grey[100]}}><ContactPageIcon/></ListItemIcon>
                            <ListItemText primary="Add Student"/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </nav>
    );
};

export default AppSideDrawer;
