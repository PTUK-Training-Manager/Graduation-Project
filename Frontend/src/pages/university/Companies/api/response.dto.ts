import {BaseResponse} from "src/types";

export interface AccessTokenData {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  managerName: string;
  }

  export interface AddCompanyResponse extends BaseResponse {
    tokenData: AccessTokenData;
  }