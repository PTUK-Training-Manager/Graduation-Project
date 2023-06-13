import React, {FC, PropsWithChildren} from "react";
import {Navigate} from "react-router-dom";
import useAccountContext from "../hooks/useAccountContext";
import {Outlet} from "react-router-dom";
import {useLocation} from 'react-router-dom';
import useVerifyAccessToken from "src/hooks/useVerifyAccessToken";
import BlockUI from "src/containers/BlockUI";

interface ProtectedRouteProps {
    redirectPath?: string;
    isAllowed?: boolean;
    allowedRoles?: number[];
}

const ProtectedRoute: FC<PropsWithChildren<ProtectedRouteProps>> = ({
                                                                        children,
                                                                        redirectPath = "/login",
                                                                        isAllowed = true,
                                                                        allowedRoles
                                                                    }) => {

    // const {isVerifying} = useVerifyAccessToken();
    //
    // if (isVerifying) return <BlockUI isBlocked/>;

    const {user} = useAccountContext();

    const location = useLocation();

    if (!user) return <Navigate to="/login" replace state={{from: location.pathname}}/>;

    if (user && allowedRoles && !allowedRoles?.includes(user.roleId))
        return <Navigate to="/me/access-denied" replace state={{from: location.pathname}}/>;

    if (!isAllowed) return <Navigate to="/me/access-denied" replace state={{from: location.pathname}}/>;

    if (!children) return <Outlet/>;

    return (<>{children}</>);
};

export default ProtectedRoute;