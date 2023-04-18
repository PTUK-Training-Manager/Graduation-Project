import {BaseResponse} from "src/types";

export interface AccessTokenData {
    companyId: string;
    location: number;
}

export interface AddBranchResponse extends BaseResponse {
    data: AccessTokenData;
}