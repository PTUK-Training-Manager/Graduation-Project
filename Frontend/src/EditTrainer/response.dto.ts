import {BaseResponse} from "src/types";

export interface AccessTokenData {
    id: string;
}

export interface updateTrainerResponse extends BaseResponse {
    data: AccessTokenData;
}