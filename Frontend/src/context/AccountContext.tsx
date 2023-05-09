import React, {createContext, useState, ReactNode, Dispatch, SetStateAction, FC,} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {User} from "../types";
import {noop} from "src/utils/functionsUtils";

interface OnLoginOptions {
    shouldNavigate?: boolean;
}

interface OnLogoutOptions {
    shouldNavigate?: boolean;
}

export interface AccountContextValues {
    user: User | null;
    onLogin: (user: User, options?: OnLoginOptions) => void;
    onLogout: (options?: OnLogoutOptions) => void;
    isSidebarOpen: boolean;
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export const AccountContext = createContext<AccountContextValues>({
    user: null,
    onLogin: noop,
    onLogout: noop,
    isSidebarOpen: false,
    setIsSidebarOpen: noop,
});

interface AccountProviderProps {
    children: ReactNode;
}

export const AccountProvider: FC<AccountProviderProps> = ({children}) => {

    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState<User | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const handleLogin = (user: User, options: OnLoginOptions = {shouldNavigate: false}) => {
        const {shouldNavigate} = options;
        setUser(user);
        if (shouldNavigate) {
            const origin = location.state?.from || '/'; // remember the origin
            navigate(origin);
        }
    };

    const handleLogout = (options: OnLoginOptions = {shouldNavigate: false}) => {
        const {shouldNavigate} = options;
        setUser(null);

        /**
         * If the current pathname is "/login" don't navigate to "/login" again!
         */
        navigate("login", {replace: true});

        setIsSidebarOpen(false);
    };

    const contextValues: AccountContextValues = {
        user,
        onLogin: handleLogin,
        onLogout: handleLogout,
        isSidebarOpen,
        setIsSidebarOpen
    }

    return (
        <AccountContext.Provider value={contextValues}>
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;
