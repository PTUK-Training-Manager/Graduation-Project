import {BaseResponse} from "src/types";

export interface AccessTokenData {
    id: string;
    name: string;
}

export interface getCompanyResponse extends BaseResponse {
    data: AccessTokenData;
}