import "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Mixins {
        niceScroll: (configs?: NiceScrollConfigs) => {};
        showTextOverflowEllipsis: () => {};
        removeInputNumberArrows: () => {};
        hideTextFieldBorder: () => {};
    }


    // allow configuration using `createTheme`
    interface ThemeOptions {
        mixins?: MixinsOptions;
    }
}
