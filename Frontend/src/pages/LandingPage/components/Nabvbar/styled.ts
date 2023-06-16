import {styled} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import {Container} from "@mui/system";

export const NavLink = styled(Typography)(({theme}) => ({
    fontSize: "14px",
    color: theme.palette.text.secondary,
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
        color: theme.palette.text.primary,
    },
}));

export const NavbarLinksBox = styled(Box)(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
        display: "none",
    },
}));

export const CustomMenuIcon = styled(MenuIcon)(({theme}) => ({
    cursor: "pointer",
    display: "none",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
        display: "block",
    },
}));

export const NavbarContainer = styled(Container)(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
        padding: theme.spacing(2),
    },
}));

export const NavbarLogo = styled("img")(({theme}) => ({
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
        display: "none",
    },
}));