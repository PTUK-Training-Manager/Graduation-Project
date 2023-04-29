import {BaseResponse} from "src/types";

export interface AccessTokenData {
    id: string;
}

export interface handleTrainingRequestResponse extends BaseResponse {
    data: AccessTokenData;
}