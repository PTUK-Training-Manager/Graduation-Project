import React, {FC, PropsWithChildren} from "react";
import {Navigate} from "react-router-dom";
import useAccountContext from "../hooks/useAccountContext";
import {Outlet} from "react-router-dom";
import {useLocation} from 'react-router-dom';
import useVerifyAccessToken from "src/hooks/useVerifyAccessToken";
import BlockUI from "src/containers/BlockUI";
import {ProtectedRouteProps} from "./types";

const ProtectedRoute: FC<PropsWithChildren<ProtectedRouteProps>> = ({
                                                                        children,
                                                                        redirectPath = "/login",
                                                                        isAllowed = true,
                                                                        allowedRoles
                                                                    }) => {

    const location = useLocation();

    const {getUser} = useAccountContext();

    const user = getUser();

    const {isVerifying} = useVerifyAccessToken();

    if (isVerifying) return <BlockUI isBlocked/>;

    if (!user) return <Navigate to="/login" replace state={{from: location.pathname}}/>;

    if (user && allowedRoles && !allowedRoles?.includes(user.roleId))
        return <Navigate to="/me/access-denied" replace state={{from: location.pathname}}/>;

    if (!isAllowed) return <Navigate to="/me/access-denied" replace state={{from: location.pathname}}/>;

    if (!children) return <Outlet/>;

    return (<>{children}</>);
};

export default ProtectedRoute;