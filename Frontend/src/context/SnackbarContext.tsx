import {ReactElement} from "react";
import {createContext, useReducer, useCallback, ReactNode} from "react";
import {AlertColor} from "@mui/material/Alert";
import {ShowSnackbarPayload} from "src/types/snackbar";
import {SnackbarOrigin} from "@mui/material/Snackbar";

interface State {
    open: boolean;
    severity: AlertColor;
    variant: "filled" | "outlined" | "standard";
    title?: ReactNode;
    message: ReactNode;
    anchorOrigin: SnackbarOrigin;
    action: ReactNode;
    autoHideDuration: number | null | undefined;
    icon: ReactNode;
}

export const initialState: State = {
    open: false,
    severity: "info",
    variant: "filled",
    title: null,
    message: "",
    anchorOrigin: {vertical: 'top', horizontal: 'center'},
    action: null,
    autoHideDuration: 6000,
    icon: undefined,
}

const enum REDUCER_ACTION_TYPE {
    SHOW_SNACKBAR,
    HIDE_SNACKBAR,
}

interface ReducerAction {
    type: REDUCER_ACTION_TYPE;
    payload?: any;
}

const reducer = (state: State, action: ReducerAction): State => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.SHOW_SNACKBAR:
            return {...state, open: true, ...action.payload};
        case REDUCER_ACTION_TYPE.HIDE_SNACKBAR:
            return {...state, open: false};
        default:
            return state;
    }
}

const useSnackbarContext = (initState: State) => {
    const [state, dispatch] = useReducer(reducer, initState);

    const showSnackbar = useCallback(
        (payload: ShowSnackbarPayload) => dispatch({
            type: REDUCER_ACTION_TYPE.SHOW_SNACKBAR,
            payload
        }), []);


    const hideSnackbar = useCallback((reason?: string) => {
        if (reason === 'clickaway') return;
        dispatch({type: REDUCER_ACTION_TYPE.HIDE_SNACKBAR})
    }, []);


    return {state, showSnackbar, hideSnackbar};
}

type SnackbarContextValues = ReturnType<typeof useSnackbarContext>;

const initContextValues: SnackbarContextValues = {
    state: initialState,
    showSnackbar: () => {
    },
    hideSnackbar: () => {
    },
}

export const SnackbarContext = createContext<SnackbarContextValues>(initContextValues);

type ChildrenType = {
    children?: ReactElement | undefined;
}

const SnackbarProvider = ({children}: ChildrenType): ReactElement => {
    const contextValues = useSnackbarContext(initialState);

    return (
        <SnackbarContext.Provider value={contextValues}>
            {children}
        </SnackbarContext.Provider>
    );
};

export default SnackbarProvider;
