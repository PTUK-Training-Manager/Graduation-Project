import { SnackbarOrigin } from "@mui/material/Snackbar";
import { AlertColor } from "@mui/material/Alert";
import {ReactNode} from "react";

export interface ShowSnackbarPayload {
    title?: ReactNode;
    message: ReactNode;
    open?: boolean;
    severity?: AlertColor;
    variant?: "filled" | "outlined" | "standard";
    anchorOrigin?: SnackbarOrigin;
    action?: ReactNode;
    autoHideDuration?: number | null | undefined;
    icon?: ReactNode;
}