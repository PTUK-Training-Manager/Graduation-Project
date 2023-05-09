import {BaseResponse} from "src/types";

export interface AccessTokenData {
    id: string;
    companyId: string;
    fieldId: string;
    Field: {
      id: string;
      field: string;
    };
    name: string;
    status: string;
    userId: string;
}

export interface updateTrainerResponse extends BaseResponse {
    data: AccessTokenData;
}