import {Component, ErrorInfo, FC, ReactNode} from "react";

export interface FallBackProps {
    error?: Error;
    errorInfo?: ErrorInfo;
}

interface ErrorBoundaryProps {
    /** custom tag to send to sentry to be filtered by */
    tag?: string;
    /** extra context to send to sentry. should only have key,value pairs */
    extraContext?: { [k in string]: string | number };
    /** callback prop called on error */
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
    /** fallback render*/
    renderFallback?: FC<FallBackProps>;
    children?: ReactNode;
}

interface ErrorBoundaryState {
    error?: Error;
    errorInfo?: ErrorInfo;
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: any) {
        super(props);
        this.state = {hasError: false, error: undefined, errorInfo: undefined};
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return {hasError: true, error};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
        this.setState({ hasError: true, error, errorInfo });
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError && this.props.renderFallback) {
            const {renderFallback: Fallback} = this.props;
            console.log(this.state);
            return <Fallback error={this.state.error} errorInfo={this.state.errorInfo}/>;
        }

        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;