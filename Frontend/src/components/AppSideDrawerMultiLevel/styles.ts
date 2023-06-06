import makeStyles from "@mui/styles/makeStyles";
import theme from "src/styling/customTheme";
import {DRAWER_WIDTH} from "src/constants";

const useStyles = makeStyles(() => ({
    drawer: {
        width: DRAWER_WIDTH,
        flexShrink: 0, // don't shrink when the window is too small
        '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            backgroundColor: theme.palette.appMenu.menuBackground,
        },
    },
}));

export default useStyles;
