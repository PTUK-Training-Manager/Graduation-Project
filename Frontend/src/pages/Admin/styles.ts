import makeStyles from "@mui/styles/makeStyles";
import useCustomTheme from "src/styling/useCustomTheme";
import {Theme} from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => {
    console.log(theme);
    // const t = useCustomTheme();
    // console.log(t);
    return ({
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
    })
});

export default useStyles;
