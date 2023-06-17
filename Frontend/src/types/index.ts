import {AxiosError, AxiosResponse} from "axios";
import {UserRole} from "src/constants/auth";

export interface BaseResponse {
    success: boolean;
    status: number;
    message: string;
    data: any;
}

export interface AxiosBaseError extends AxiosError<BaseResponse> {}

export interface User {
    userId: string;
    name: string;
    username: string;
    roleId: number;
    permissions: any[];
}

export type UserRoleKey = keyof typeof UserRole;

export type MenuItemsMapKey = UserRoleKey | "Shared" | "Public";

export interface IdNameGeneric<T> {
    id: string;
    name: T;
}

export interface IdName extends IdNameGeneric<string> {}

export interface LabelValue<T> {
    label: string;
    value: T;
}
