import {BaseResponse} from "src/types";

export interface AccessTokenData {
    id:string;
    name:string;
    phoneNumber:string;
    managerName:string;
    location:string;
    email:string;
  }

  export interface AddCompanyResponse extends BaseResponse {
    tokenData: AccessTokenData;
  }