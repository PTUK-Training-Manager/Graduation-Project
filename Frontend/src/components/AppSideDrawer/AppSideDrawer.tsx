import React, {FC} from 'react';
import Drawer, {DrawerProps} from "@mui/material/Drawer";
import useStyles from "./styles";
import {DRAWER_WIDTH} from "src/constants";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {useTheme} from '@mui/material/styles';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import {grey} from "@mui/material/colors";
import DrawerHeader from "./DrawerHeader";
import {useNavigate} from "react-router-dom";

interface AppSideDrawerProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const AppSideDrawer: FC<AppSideDrawerProps> = ({isOpen, setIsOpen}) => {
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
                <DrawerHeader/> {/* Necessary for the drawer content to be below the app bar */}
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/submitRequest")}>
                            <ListItemIcon sx={{color: grey[100]}}><ContactPageIcon/></ListItemIcon>
                            <ListItemText primary="Submit Request"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/addCompany")}>
                            <ListItemIcon sx={{color: grey[100]}}><ContactPageIcon/></ListItemIcon>
                            <ListItemText primary="Add company"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/currentTrainees")}>
                            <ListItemIcon sx={{color: grey[100]}}><ContactPageIcon/></ListItemIcon>
                            <ListItemText primary="Current trainees"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/completedTrainees")}>
                            <ListItemIcon sx={{color: grey[100]}}><ContactPageIcon/></ListItemIcon>
                            <ListItemText primary="Completed trainees"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/search")}>
                            <ListItemIcon sx={{color: grey[100]}}><ContactPageIcon/></ListItemIcon>
                            <ListItemText primary="Search"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/addstudent")}>
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
