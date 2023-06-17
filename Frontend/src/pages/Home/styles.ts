import makeStyles from "@mui/styles/makeStyles";
import theme from "src/styling/customTheme";
import HomePageImage from "src/images/assets/pro.png";

export const useStyles = makeStyles(() => ({
    root: {
        height: `calc(100vh - ${theme.mixins.toolbar.height}px)`,
        justifyContent: "space-between",
    },
    bgImg: {
        backgroundImage: `url(${HomePageImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backgroundRepeat: 'no-repeat',
        maxWidth: "100%",
        height: "100%",
        backgroundBlendMode: "overlay",
    },
}));

export const usePanelStyles = makeStyles(() => ({
    container: {
        padding: theme.spacing(3, 2)
    }
}));
