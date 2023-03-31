import {CustomThemeMixins} from "./types";

const customMixins: CustomThemeMixins =  {
    niceScroll: configs => {
        return {
            overflow: "auto",
            "&:hover": {
                "&::-webkit-scrollbar-thumb:vertical": {
                    background: "rgba(0,0,0,0.5)",
                },
            },
            "&::-webkit-scrollbar": {
                width: configs?.width ?? 10,
                position: "fixed",
                backgroundColor: "rgba(0,0,0,0)",
                borderRadius: 100,
            },
            "&::-webkit-scrollbar:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.09)",
            },
            "&::-webkit-scrollbar-thumb:vertical": {
                background: "rgba(0,0,0,0)",
                backgroundClip: "padding-box",
                border: "2px solid rgba(0, 0, 0, 0)",
                borderRadius: 100,
                minHeight: 10,
            },
            "&::-webkit-scrollbar-thumb:vertical:active": {
                background: "rgba(0,0,0,0.61)",
                borderRadius: 100,
            },
        };
    },
        showTextOverflowEllipsis: () => ({
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        width: "inherit",
    }),
        removeInputNumberArrows: () => ({
        "& input[type='number']": {
            appearance: "textfield",
        },
        "& input[type='number']::-webkit-inner-spin-button": {
            appearance: "none",
        },
    }),
        hideTextFieldBorder: () => {
        return {
            width: "100%",
            background: "transparent",
            "& fieldset": {
                border: "none",
            },
            "&:hover": {
                background: "white",
                "& fieldset": {
                    border: "1px solid",
                },
            },
            "&.Mui-focused": {
                "& fieldset": {
                    border: "1px solid",
                },
            },
            "& .MuiIconButton-label, & .MuiIconButton-root": {
                visibility: "hidden",
            },
            "&:hover .MuiIconButton-label, &:hover .MuiIconButton-root": {
                visibility: "visible",
            },
            "& .opened": {
                "& .MuiIconButton-label, & .MuiIconButton-root": {
                    visibility: "visible",
                },
                "& fieldset": {
                    border: "1px solid",
                },
            },
        };
    },
};

export default customMixins;