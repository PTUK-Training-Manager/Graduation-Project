import {BaseResponse} from "src/types";

export interface AccessTokenData {
    map(arg0: (company: any) => { id: any; location: any; }): unknown;
    id: string;
    location: string;
}

export interface getBranchResponse extends BaseResponse {
    data: AccessTokenData;
}