import React, {FC, useState} from 'react';
import {ErrorBoundary, ErrorBoundaryProps,} from "react-error-boundary";
import UnexpectedError from "../UnexpectedError";
import {ErrorBoundaryFCProps} from "./types";

const ErrorBoundaryFC: FC<ErrorBoundaryFCProps> = (props) => {
    const {children} = props;

    const [someKey, setSomeKey] = useState(null)

    const resetErrorBoundary: ErrorBoundaryProps["onReset"] = () => setSomeKey(null);

    const logErrorToService: ErrorBoundaryProps["onError"] = (error, info) => {
        // Use your preferred error logging service
        console.error("Caught an error:", error, info);
    }

    return (
        <ErrorBoundary
            FallbackComponent={UnexpectedError}
            onError={logErrorToService}
            onReset={resetErrorBoundary} // reset the state of your app here
            resetKeys={[someKey]} //when changed, will trigger a reset of the error boundary.
        >
            {children}
        </ErrorBoundary>
    );
};

export default ErrorBoundaryFC;
