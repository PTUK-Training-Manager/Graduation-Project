import {CSSProperties} from "react";
import makeStyles from "@mui/styles/makeStyles";
import theme from "src/styling/customTheme";
import {NAVBAR_HEIGHT} from "src/constants";
import {grey} from "@mui/material/colors";

const defaultContentArea: CSSProperties = {
    position: "absolute",
    top: NAVBAR_HEIGHT,
    right: 0,
    display: "block",
    overflow: "auto",
    height: `calc(100% - ${NAVBAR_HEIGHT}px)`,
    transition: ".25s",
    backgroundColor: grey[50],
    // padding: theme.spacing(3),
};

const useStyles = makeStyles(() => ({
    root: {
        ...theme.mixins.niceScroll(),
    },
    contentArea: {
        ...defaultContentArea,
        ...theme.mixins.niceScroll(),
        // padding: theme.spacing(3),
        justifyContent: "center",
        alignItems: "center",
    }
}));

export default useStyles;
