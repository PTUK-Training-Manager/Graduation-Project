import { Theme } from "@mui/material/styles";
import {CSSProperties} from "react";

interface NiceScrollConfigs {
    width?: number;
}

export interface CustomThemeMixins {
    // niceScroll: (configs?: NiceScrollConfigs) => {};
    niceScroll: () => {};
    showTextOverflowEllipsis: () => {};
    removeInputNumberArrows: () => {};
    hideTextFieldBorder: () => {};
    toolbar: any;
}

export interface AppMenuPalette {
    menuBackground: string;
    menuItemLeftBorder: string;
    menuItemSelectedColor: string;
    menuItemSelectedBackground: string;
    red: string;
}

export interface LandingPagePalette {
    indigo: string;
    whiteIndigo: string;
    greyText: string;
}

export interface CustomTheme extends Theme {
}
