import {BaseResponse} from "src/types";

export interface GetAllFieldsData {
    id: string;
    field: string;
}

export interface GetAllFieldsResponse extends BaseResponse {
    data: GetAllFieldsData[];
}

export interface SetNewPasswordBody {
    newPassword: string;
    confirmNewPassword: string;
}