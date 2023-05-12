import {BaseResponse} from "src/types";

export interface DeleteRequestData {
    id: string;
}

export interface DeleteRequestResponse extends BaseResponse {
    data: DeleteRequestData;
}