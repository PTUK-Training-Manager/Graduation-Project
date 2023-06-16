import makeStyles from "@mui/styles/makeStyles";
import theme from "src/styling/customTheme";
import {DRAWER_WIDTH} from "src/constants";

const useStyles = makeStyles(() => ({
    drawerPaperAnchorRight: {
        width: DRAWER_WIDTH,
        right: 0,
    },
    drawer: {
        width: DRAWER_WIDTH,
        flexShrink: 0, // don't shrink when the window is too small
        '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            backgroundColor: theme.palette.appMenu.menuBackground,
            // backgroundColor: "red",
            // right: 0,
        },
        // "& .MuiPaper-root": {
        //     // backgroundColor: "blue",
        //     // right: 0,
        // },
        // "&. MuiPaper-root-MuiDrawer-paper": {
        //     backgroundColor: "green",
        // },
    },
}));

export default useStyles;