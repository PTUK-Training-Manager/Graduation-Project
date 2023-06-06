import makeStyles from "@mui/styles/makeStyles";
import theme from "src/styling/customTheme";

const useStyles = makeStyles(() => ({
    extraOptions: {
        height: 32,
        width: 32,
        cursor: "pointer",
        fontSize: theme.typography.pxToRem(14),
        backgroundColor: `${theme.palette.grey[600]}`,
        borderRadius: "50%",
        color: "white",
        textAlign: "start",
    },
}));

export default useStyles;
