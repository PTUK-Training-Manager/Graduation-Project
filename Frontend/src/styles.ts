import makeStyles from "@mui/styles/makeStyles";
import customTheme from "src/styling/customTheme";

const useStyles = makeStyles(() => ({
    root: {
        ...customTheme.mixins.niceScroll()
    }
}));

export default useStyles;
