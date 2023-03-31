import React, {FC} from 'react';
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import {useNavigate} from "react-router-dom";
import "./ustyle.css";

interface SidebarProps {
}

const drawerWidth = 240;


const Sidebar: FC<SidebarProps> = (props) => {

    const navigate = useNavigate();

    const handleClickSR = () => {
        window.location.href = '/submitRequest';
        navigate('/submitRequest');
    };

    const handleClickAC = () => {
        window.location.href = '/addCompany';
    };

    const handleClickCoT = () => {
        window.location.href = '/completedTrainees';
    };

    const handleClickCuT = () => {
        window.location.href = '/currentTrainee';
    };

    const handleClickS = () => {
        window.location.href = '/search';
    };

    const handleClickAS = () => {
        window.location.href = '/addStudent';
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                height: "100%",
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Box className="side" sx={{overflow: 'auto'}}>
                SSSSSSSSSs
            {/*    <List>*/}
            {/*        <ListItem disablePadding sx={{display: 'block'}}>*/}
            {/*            <ListItemButton*/}
            {/*                sx={{*/}
            {/*                    minHeight: '3rem',*/}
            {/*                    px: '0.15625rem',*/}
            {/*                }}*/}
            {/*                onClick={handleClickSR}*/}
            {/*            >*/}
            {/*                <ListItemText sx={{ml: "2.5rem"}} primary="Submit Request"/>*/}

            {/*            </ListItemButton>*/}
            {/*        </ListItem>*/}
            {/*    </List>*/}
            {/*    <Divider/>*/}
            {/*    <List>*/}
            {/*        <ListItem disablePadding sx={{display: 'block'}}>*/}
            {/*            <ListItemButton*/}
            {/*                sx={{*/}
            {/*                    minHeight: '3rem',*/}
            {/*                    px: '0.15625rem',*/}
            {/*                }}*/}
            {/*                onClick={handleClickAC}*/}
            {/*            >*/}
            {/*                <ListItemText sx={{ml: "2.5rem"}} primary="Add Company"/>*/}
            {/*            </ListItemButton>*/}
            {/*        </ListItem>*/}
            {/*    </List>*/}
            {/*    <Divider/>*/}
            {/*    <List>*/}
            {/*        <ListItem disablePadding sx={{display: 'block'}}>*/}
            {/*            <ListItemButton*/}
            {/*                sx={{*/}
            {/*                    minHeight: '3rem',*/}
            {/*                    px: '0.15625rem',*/}
            {/*                }}*/}
            {/*                onClick={handleClickCuT}*/}
            {/*            >*/}
            {/*                <ListItemText sx={{ml: "2.5rem"}} primary="Current Trainees"/>*/}
            {/*            </ListItemButton>*/}
            {/*        </ListItem>*/}
            {/*    </List>*/}
            {/*    <Divider/>*/}
            {/*    <List>*/}
            {/*        <ListItem disablePadding sx={{display: 'block'}}>*/}
            {/*            <ListItemButton*/}
            {/*                sx={{*/}
            {/*                    minHeight: '3rem',*/}
            {/*                    px: '0.15625rem',*/}
            {/*                }}*/}
            {/*                onClick={handleClickCoT}*/}
            {/*            >*/}
            {/*                <ListItemText sx={{ml: "2.5rem"}} primary="Completed Trainees"/>*/}

            {/*            </ListItemButton>*/}
            {/*        </ListItem>*/}
            {/*    </List>*/}
            {/*    <Divider/>*/}
            {/*    <List>*/}
            {/*        <ListItem disablePadding sx={{display: 'block'}}>*/}
            {/*            <ListItemButton*/}
            {/*                sx={{*/}
            {/*                    minHeight: '3rem',*/}
            {/*                    px: '0.15625rem',*/}
            {/*                }}*/}
            {/*                onClick={handleClickS}*/}
            {/*            >*/}
            {/*                <ListItemText sx={{ml: "2.5rem"}} primary="Search"/>*/}
            {/*            </ListItemButton>*/}
            {/*        </ListItem>*/}
            {/*    </List>*/}
            {/*    <Divider/>*/}
            {/*    <List>*/}
            {/*        <ListItem disablePadding sx={{display: 'block'}}>*/}
            {/*            <ListItemButton*/}
            {/*                sx={{*/}
            {/*                    minHeight: '3rem',*/}
            {/*                    px: '0.15625rem',*/}
            {/*                }}*/}
            {/*                onClick={handleClickAS}*/}
            {/*            >*/}
            {/*                <ListItemText sx={{ml: "2.5rem"}} primary="Add Student"/>*/}
            {/*            </ListItemButton>*/}
            {/*        </ListItem>*/}
            {/*    </List>*/}
            </Box>
        </Drawer>
    );
};

export default Sidebar;
