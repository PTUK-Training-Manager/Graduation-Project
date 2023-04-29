import {BaseResponse} from "src/types";

export interface AccessTokenData {
    id: string;
  companyId: string;
  field: string;
  name: string;
  status: string;
  userId: string;
}

export interface assignTrainerRequestResponse extends BaseResponse {
    data: AccessTokenData;
}