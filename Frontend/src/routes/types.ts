import React, {ReactElement} from 'react';

export interface IAppMenuItem {
    label: string;
    link?: string;
    Icon?: () => ReactElement;
    items?: IAppMenuItem[];
}

export interface ProtectedRouteProps {
    redirectPath?: string;
    isAllowed?: boolean;
    allowedRoles?: number[];
}

