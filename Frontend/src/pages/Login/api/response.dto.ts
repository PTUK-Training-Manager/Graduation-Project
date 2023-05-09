import {BaseResponse} from "src/types";

export interface AccessTokenData {
    username: string;
    roleId: number;
}

export interface LoginResponse extends BaseResponse {
    data: AccessTokenData;
    accessToken?: string;
}