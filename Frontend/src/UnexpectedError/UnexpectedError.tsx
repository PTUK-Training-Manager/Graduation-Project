import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import React, {ErrorInfo, FC} from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {isProduction} from "src/utils";
// import {ErrorBoundaryProps} from "react-error-boundary";
import useStyles from "./styles";
import {UnexpectedErrorProps} from "./types";

const UnexpectedError: FC<UnexpectedErrorProps> = props => {
    const classes = useStyles();

    const {error, resetErrorBoundary} = props;

    if (isProduction) return (
        <Stack gap={2} className={`${classes.root} ${classes.productionError}`}>
            <Typography variant="h4" className={classes.error}>
                <ErrorOutlineIcon fontSize={"large"} className={classes.icon}/> Unexpected Error
            </Typography>
            <Button onClick={resetErrorBoundary} variant="contained" color="warning">Try again</Button>
        </Stack>
    );

    return (
        <Stack gap={2} role="alert" className={classes.root}>
            <Typography variant="h4" fontWeight={500}>Unexpected
                Error: {props.error?.message ?? JSON.stringify(props.error)}
            </Typography>
            <pre className={classes.errorMessage}>{props?.error?.message}</pre>
            <pre className={classes.errorStack}>{props?.error?.stack}</pre>
            <Stack direction="row" sx={{justifyContent: "center"}}>
                <Button onClick={resetErrorBoundary} fullWidth={false} variant="contained" color="warning">Try again</Button>
            </Stack>
        </Stack>
    )
};

export default UnexpectedError;
