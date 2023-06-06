import makeStyles from "@mui/styles/makeStyles";
import theme from "src/styling/customTheme";
import {grey} from "@mui/material/colors";

const useStyles = makeStyles(() => ({
    customInset: {
        paddingLeft: "41px !important",
    },
    listItemButton: {
      borderRadius: `${theme.shape.borderRadius}px !important`,
        "& svg:last-of-type": {
            margin: "0 !important",
        }
    },
    
    listItemChild: {
        "&::before": {
            content: '""',
            borderLeft: `3px solid ${theme.palette.appMenu.menuItemLeftBorder}`,
            position: "absolute",
            height: "100%",
            left: "25px",
        },
    },
    listItemIcon: {
        minWidth: "auto !important",
        color: `${grey[500]} !important`,
        marginRight: theme.spacing(2),
        // "& svg": {
        //     fontSize: "1.5rem",
        // }
    },
    listItemText: {
        color: grey[500],
        "& span": {
            fontSize: "12px",
            fontWeight: 400,
            letterSpacing: "0.4px",
        }
    },
    selected: {
        background: `${theme.palette.appMenu.menuItemSelectedBackground} !important`,
        color: theme.palette.appMenu.menuItemSelectedColor,
        "& .MuiListItemIcon-root, & .MuiListItemText-root": {
            color: `${theme.palette.appMenu.menuItemSelectedColor} !important`,
        },
        "& span": {
            fontWeight: 500,
        },
    },
    childSelected: {
        "&::before": {
            content: '""',
            borderLeft: `3px solid ${theme.palette.appMenu.menuItemSelectedColor}`,
            position: "absolute",
            height: "100%",
            left: "25px",
        },
    },
    hasSelectedChild: {
        "& .MuiListItemIcon-root, & .MuiListItemText-root": {
            color: `${theme.palette.appMenu.menuItemSelectedColor} !important`,
        },
        "& span": {
            fontWeight: 500,
        },
        "& svg": {
            color: `${theme.palette.appMenu.menuItemSelectedColor} !important`,
        }
    },
}));

export default useStyles;
