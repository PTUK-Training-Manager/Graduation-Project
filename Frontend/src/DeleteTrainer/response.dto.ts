import {BaseResponse} from "src/types";

export interface AccessTokenData {
    id: string;
}

export interface deleteTrainerResponse extends BaseResponse {
    data: AccessTokenData;
}