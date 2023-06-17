import React, {createContext, useState, ReactNode, Dispatch, SetStateAction, FC,} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {User} from "../types";
import {noop} from "src/utils/functionsUtils";
import {Theme, useMediaQuery} from "@mui/material";

interface OnLoginOptions {
    shouldNavigate?: boolean;
}

interface OnLogoutOptions {
    shouldNavigate?: boolean;
}

export interface AccountContextValues {
    getUser: () => User | null;
    onLogin: (user: User, options?: OnLoginOptions) => void;
    onLogout: (options?: OnLogoutOptions) => void;
    isSidebarOpen: boolean;
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
    isMobile: boolean;
}

export const AccountContext = createContext<AccountContextValues>({
    getUser: () => null,
    onLogin: noop,
    onLogout: noop,
    isSidebarOpen: false,
    setIsSidebarOpen: () => {},
    isMobile: false
});

interface AccountProviderProps {
    children: ReactNode;
}

export const AccountProvider: FC<AccountProviderProps> = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState<User | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const getUser = () => {
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr) as User;
        return null;
    }

    const handleLogin = (user: User, options: OnLoginOptions = {shouldNavigate: false}) => {
        const {shouldNavigate} = options;
        setUser(user);
        if (shouldNavigate) {
            const origin = location.state?.from || '/me'; // remember the origin
            navigate(origin);
        }
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("access-token");
        setIsSidebarOpen(false);
        navigate("login", {replace: true});
    };

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

    const contextValues: AccountContextValues = {
        getUser,
        onLogin: handleLogin,
        onLogout: handleLogout,
        isSidebarOpen,
        setIsSidebarOpen,
        isMobile
    }

    return (
        <AccountContext.Provider value={contextValues}>
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;
