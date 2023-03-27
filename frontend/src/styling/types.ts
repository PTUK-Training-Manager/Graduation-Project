import { Theme } from "@mui/material/styles";

interface NiceScrollConfigs {
    width?: number;
}

export interface CustomThemeMixins {
    niceScroll: (configs?: NiceScrollConfigs) => {};
    showTextOverflowEllipsis: () => {};
    removeInputNumberArrows: () => {};
    hideTextFieldBorder: () => {};
}

export interface CustomTheme extends Theme {
}