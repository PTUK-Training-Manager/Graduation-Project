import React, {FC, useState} from 'react';
import Box from "@mui/material/Box";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HomeIcon from "@mui/icons-material/Home";
import ContactsIcon from "@mui/icons-material/Contacts";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {NavLink, NavbarLinksBox, NavbarContainer, NavbarLogo, CustomMenuIcon} from "./styled";
import {ListAnchor} from "../../types";
import logoImg from "src/images/landing/logo.png";
import {useNavigate} from "react-router-dom";
import StyledButton from "../StyledButton";

const Navbar: FC = () => {

    const user = localStorage.getItem("access-token");

    const navigate = useNavigate();

    const [mobileMenu, setMobileMenu] = useState({
        left: false,
    });

    const toggleDrawer = (anchor: ListAnchor, open: boolean) => (event: any) => {
        if (event.type === "keydown" && (event.type === "Tab" || event.type === "Shift")) return;
        setMobileMenu({...mobileMenu, [anchor]: open});
    };

    const goToLogin = () => navigate("/login");

    const goToAccount = () => navigate("/me");

    const list = (anchor: ListAnchor) => (
        <Box
            sx={{width: anchor === "top" || anchor === "bottom" ? "auto" : 250}}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {["Home", "Features", "Services", "Listed", "Contact"].map(
                    (text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index === 0 && <HomeIcon/>}
                                    {index === 1 && <FeaturedPlayListIcon/>}
                                    {index === 2 && <MiscellaneousServicesIcon/>}
                                    {index === 3 && <ListAltIcon/>}
                                    {index === 4 && <ContactsIcon/>}
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>
                    )
                )}
            </List>
        </Box>
    );


    return (
        <NavbarContainer>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "2.5rem",
                }}
            >
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <CustomMenuIcon onClick={toggleDrawer("left", true)}/>
                    <Drawer
                        anchor="left"
                        open={mobileMenu["left"]}
                        onClose={toggleDrawer("left", false)}
                    >
                        {list("left")}
                    </Drawer>
                    <NavbarLogo src={logoImg} alt="logo" sx={{height: "35px", width: "180px"}}/>
                </Box>

                <NavbarLinksBox>
                    <NavLink variant="body2">Home</NavLink>
                    <NavLink variant="body2">Features</NavLink>
                    <NavLink variant="body2">Services</NavLink>
                    <NavLink variant="body2">Listed</NavLink>
                    <NavLink variant="body2">Contact</NavLink>
                </NavbarLinksBox>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                }}
            >
                {!user && <StyledButton text="Login" onClick={goToLogin}/>}
                {user && <StyledButton text="Account" onClick={goToAccount}/>}
            </Box>
        </NavbarContainer>
    );
};

export default Navbar;
