import makeStyles from "@mui/styles/makeStyles";
import theme from "src/styling/customTheme";

const useStyles = makeStyles(() => ({
    root: {
        alignItems: "center",
        backgroundColor: "antiquewhite",
        height: `calc(100vh - ${theme.mixins.toolbar.height}px)`,
        justifyContent: "center",
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
