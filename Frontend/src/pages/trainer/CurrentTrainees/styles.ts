import makeStyles from "@mui/styles/makeStyles";
import theme from "src/styling/customTheme";

const useStyles = makeStyles(() => ({
    tableContainer: {
        ...theme.mixins.niceScroll(),
    }
}));

export default useStyles;