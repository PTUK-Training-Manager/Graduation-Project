import React, {FC} from 'react';
import MuiSnackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Slide from '@mui/material/Slide';
import useSnackbar from "src/hooks/useSnackbar";

interface SnackbarProps {
}

const Snackbar: FC<SnackbarProps> = () => {
    const {state, hideSnackbar} = useSnackbar();
    const {open, title, message, severity, variant, anchorOrigin, action, autoHideDuration, icon} = state;

    return (
        <MuiSnackbar
            open={open}
            autoHideDuration={autoHideDuration}
            //@ts-ignore
            onClose={hideSnackbar}
            anchorOrigin={anchorOrigin}
            TransitionComponent={Slide}
        >
            <Alert
                icon={icon}
                variant={variant}
                //@ts-ignore
                onClose={hideSnackbar}
                severity={severity}
                sx={{width: '100%'}}
                action={action}
            >
                {title && <AlertTitle>{title}</AlertTitle>}
                {message}
            </Alert>
        </MuiSnackbar>
    );
};

export default Snackbar;