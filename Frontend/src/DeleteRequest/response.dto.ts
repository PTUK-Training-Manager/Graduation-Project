import {BaseResponse} from "src/types";

export interface AccessTokenData {
    id: string;
}

export interface deleteRequestResponse extends BaseResponse {
    data: AccessTokenData;
}