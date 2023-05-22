import {AxiosError} from "axios";
import {UserRole} from "src/constants/auth";

export interface BaseResponse {
    success: boolean;
    status: number;
    message: string;
    data: any;
}

export interface AxiosBaseError extends AxiosError<BaseResponse> {}

export interface User {
    id?: string;
    name?: string;
    username: string;
    roleId: number;
    permissions?: any[];
}

export type UserRoleKey = keyof typeof UserRole;

export type MenuItemsMapKey = UserRoleKey | "Shared" | "Public";
