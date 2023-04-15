import React, {FC, PropsWithChildren} from "react";
import {Navigate} from "react-router-dom";
import useAccountContext from "../hooks/useAccountContext";
import {Outlet} from "react-router-dom";
import {useLocation} from 'react-router-dom';

interface ProtectedRouteProps {
    redirectPath?: string;
    isAllowed?: boolean;
    allowedRoles?: number[];
}

const ProtectedRoute: FC<PropsWithChildren<ProtectedRouteProps>> = ({
                                                                        children,
                                                                        redirectPath = "/signin",
                                                                        isAllowed = true,
                                                                        allowedRoles
                                                                    }) => {
    const location = useLocation();

    const {user} = useAccountContext();

    if (!user) return <Navigate to="/signin" replace state={{from: location.pathname}}/>;

    if (allowedRoles && !allowedRoles?.includes(user.roleId))
        return <Navigate to="/access-denied" replace state={{from: location.pathname}}/>;

    if (!isAllowed) return <Navigate to="/access-denied" replace state={{from: location.pathname}}/>;

    if (!children) return <Outlet/>;

    return (<>{children}</>);
};

export default ProtectedRoute;