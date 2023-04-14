import {AxiosError} from "axios";

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
    // tokenData: AccessTokenData;
    username: string;
    roleId: number;
    permissions?: any[];
}