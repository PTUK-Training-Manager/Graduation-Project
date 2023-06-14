import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React, {ErrorInfo, FunctionComponent, FC} from "react";
import makeStyles from "@mui/styles/makeStyles";
import theme from "src/styling/customTheme";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {isProduction} from "src/utils";
import {ErrorBoundaryProps} from "react-error-boundary";

const useStyles = makeStyles(() => ({
    root: {
        padding: 20,
    },
    productionError: {
        backgroundColor: theme.palette?.background?.default,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
    },
    error: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    icon: {
        margin: 10,
    },
    errorMessage: {
      padding: "20px 0",
      color: theme.palette?.error?.main,
      fontSize: "1.3rem",
    },
    componentStack: {
        padding: "10px 0",
        border: "2px solid lightgrey",
        background: "#fefefe",
        borderRadius: "4px",
    }
}));

interface UnexpectedErrorProps {
    error?: Error;
    errorInfo?: ErrorInfo;
    // resetErrorBoundary: (...args: any[]) => void;
}

const UnexpectedError: FC<UnexpectedErrorProps> = props => {
    const classes = useStyles();

    const {error, errorInfo} = props;

    console.log({
        error,
        errorInfo,
    });

    if (isProduction) return (
        <Box className={`${classes.root} ${classes.productionError}`}>
            <Typography variant="h4" fontWeight={500} className={classes.error}>
                <ErrorOutlineIcon fontSize={"large"} className={classes.icon}/> Unexpected Error
            </Typography>
        </Box>
    );

    return (
        <Box role="alert" className={classes.root}>
            <Typography variant="h4" fontWeight={500}>Unexpected
                Error: {props.error?.message ?? JSON.stringify(props.error)}</Typography>
            <pre className={classes.errorMessage}>{props?.error?.message}</pre>
            <pre className={classes.componentStack}>{props?.errorInfo?.componentStack}</pre>
        </Box>
    )
};

export default UnexpectedError;
