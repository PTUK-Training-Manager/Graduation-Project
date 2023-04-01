import makeStyles from "@mui/styles/makeStyles";
import theme from "src/styling/customTheme";

const useStyles = makeStyles(() => ({
    root: {
        alignItems: "center",
        // ...theme.mixins.toolbar,
    },
    img: {
        width: 300,
        height: 300,
    },
    container: {
        backgroundColor: "antiquewhite",
        width: "100px",
        height: "130px",
        overflow: "auto",
        ...theme.mixins.toolbar,
        ...theme.mixins.niceScroll(),
    }
}));

export default useStyles;
