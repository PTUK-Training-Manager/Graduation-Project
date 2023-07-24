import makeStyles from "@mui/styles/makeStyles";
import theme from "src/styling/customTheme";

const useStyles = makeStyles(() => ({
  appMenu: {
    padding: `${theme.spacing(1)} !important`, // I had to use !important to override the default padding
    ...theme.mixins.niceScroll(),
  },
}));

export default useStyles;
