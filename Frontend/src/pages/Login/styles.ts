import makeStyles from "@mui/styles/makeStyles";
import theme from "src/styling/customTheme";

const useStyles = makeStyles(() => ({
    root: {
        transition: '.25s',
        position: 'relative',
        paddingTop: "64px",
        bgcolor: theme.palette.grey[100],
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: "space-between",
        alignItems: 'center',
    },
}));

export default useStyles;