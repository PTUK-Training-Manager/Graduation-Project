import makeStyles from "@mui/styles/makeStyles";
import theme from "src/styling/customTheme";
import {grey} from "@mui/material/colors";
import {DRAWER_WIDTH} from "src/constants";

const useStyles = makeStyles(() => ({
    drawer: {
        width: DRAWER_WIDTH,
        flexShrink: 0, // don't shrink when the window is too small
        '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            // backgroundColor: grey[800],
            backgroundColor: theme.palette.appMenu.menuBackground,
        },
    },
}));

export default useStyles;
