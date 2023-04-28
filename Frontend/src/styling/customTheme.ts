import {createTheme} from '@mui/material/styles';
import customMixins from "./mixins";
import {lightBlue} from "@mui/material/colors";

const customTheme = createTheme({
    mixins: customMixins,
    palette: {
        appMenu: {
            menuBackground: "#1E1E1E",
            menuItemLeftBorder: "rgba(225,245,250,0.14)",
            menuItemSelectedColor: lightBlue[500],
            menuItemSelectedBackground: "rgba(225,245,250,0.24)",
        },
    },
});

export default customTheme;