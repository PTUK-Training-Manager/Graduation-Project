import {createContext, useContext, FC, ReactNode, useState} from "react";
import {DialogType} from "../constants";

export interface LoginContextValues {
    openDialog: DialogType | null;
    onOpenDialog: (dialog: DialogType) => void;
    onCloseDialog: () => void;
}

const LoginContext = createContext<LoginContextValues | null>(null);

export const useLoginContext = () => {
    const context = useContext(LoginContext);

    if (!context) throw new Error("useLoginContext must be used within LoginContextProvider");

    return context;
}

export interface LoginProviderProps {
    children: ReactNode;
}

export const LoginProvider: FC<LoginProviderProps> = ({children}) => {

    const [openDialog, setOpenDialog] = useState<DialogType | null>(null);

    const contextValues: LoginContextValues = {
        openDialog,
        onOpenDialog: (dialog: DialogType) => setOpenDialog(dialog),
        onCloseDialog: () => setOpenDialog(null),
    }

    return (
        <LoginContext.Provider value={contextValues}>
            {children}
        </LoginContext.Provider>
    )
}