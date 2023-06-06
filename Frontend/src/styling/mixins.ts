import {CustomThemeMixins} from "./types";

const customMixins: CustomThemeMixins = {
    niceScroll: () => {
        return {
            overflow: "auto",
            transition: "all 0.3s ease",
            "&:hover": {
                transition: "all 0.3s ease",
                "&::-webkit-scrollbar-thumb": {
                    background: "rgba(0,0,0,0.3)",
                },
            },
            "&::-webkit-scrollbar": {
                // width: 10,
                height: 10,              /* height of horizontal scrollbar ← You're missing this */
                width: 9,     /* width of vertical scrollbar */
                position: "fixed",
                backgroundColor: "rgba(0,0,0,0)",
            },
            "&::-webkit-scrollbar-thumb": {
                background: "rgba(0,0,0,0)",
                backgroundClip: "padding-box",
                border: "2px solid rgba(0, 0, 0, 0)",
                borderRadius: 2,
                minHeight: 4,
            },
            "&::-webkit-scrollbar-thumb:hover": {
                borderWidth: "20px",
            },
            // "&::-webkit-scrollbar-thumb:active": {
            //     background: "rgba(0,0,0,0.61)",
            // },
            "&::-webkit-scrollbar-track": {
                "-webkit-box-shadow": "inset 0 0 6px rgba(0, 0, 0, 0.1)",
            },
            "&::-webkit-scrollbar-track:hover": {
                backgroundColor: "#F5F5F5",
            }
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
    toolbar: {
        "@media (min-width:0px)": {
            "@media (orientation: landscape)": {
                minHeight: 48,
            },
        },
        "@media (min-width:600px)": {
            minHeight: 64,
        },
        minHeight: 56,
        height: 64,
    },
};

export default customMixins;