import {BaseResponse} from "src/types";

export interface SignInRequestBody {
    username: string,
    password: string
}

interface AccessTokenData {
    username: string,
    roleId: number,
}

export interface SignInResponse extends BaseResponse{
    tokenData: AccessTokenData
}