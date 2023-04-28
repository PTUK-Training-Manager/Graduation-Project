import {BaseResponse} from "src/types";

export interface AccessTokenData {
    username: string;
    roleId: number;
}

export interface SignInResponse extends BaseResponse {
    data: AccessTokenData;
}