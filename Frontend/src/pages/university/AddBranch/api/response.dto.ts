import {BaseResponse} from "src/types";

export interface AccessTokenData {
    id: string;
    location: number;
}

export interface AddBranchResponse extends BaseResponse {
    data: AccessTokenData;
}