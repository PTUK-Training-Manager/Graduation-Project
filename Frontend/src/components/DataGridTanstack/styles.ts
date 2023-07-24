import makeStyles from "@mui/styles/makeStyles";
import theme from "src/styling/customTheme";

const useStyles = makeStyles(() => ({
  resizer: {
    position: "absolute",
    right: 0,
    width: "4px",
    background: theme.palette.grey[300],
    top: 0,
    height: "100%",
    cursor: "col-resize",
    userSelect: "none",
    touchAction: "none",
  },
  niceScroll: {
    ...theme.mixins.niceScroll(),
  },
}));

export default useStyles;
