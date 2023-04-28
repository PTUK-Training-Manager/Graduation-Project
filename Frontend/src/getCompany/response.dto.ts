import {BaseResponse} from "src/types";

export interface AccessTokenData {
    map(arg0: (company: any) => { id: any; name: any; }): unknown;
    id: string;
    name: string;
}

export interface getCompanyResponse extends BaseResponse {
    data: AccessTokenData;
}