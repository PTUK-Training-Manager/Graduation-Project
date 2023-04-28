import {BaseResponse} from "src/types";

export interface AccessTokenData {
    id: string;
    location: string;
}

export interface AddBranchResponse extends BaseResponse {
    data: AccessTokenData;
}