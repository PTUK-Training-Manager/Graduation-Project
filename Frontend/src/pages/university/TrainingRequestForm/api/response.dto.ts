import {BaseResponse} from "src/types";

export interface AccessTokenData {
    id: string;
    type: string;
    semester: string;
    status: string;
    studentId: string;
    companyBranchId: string;
  }

  export interface SubmitRequestResponse extends BaseResponse {
    tokenData: AccessTokenData;
  }