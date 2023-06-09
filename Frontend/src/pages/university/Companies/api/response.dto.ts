import {BaseResponse} from "src/types";

export interface AddCompanyData {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  managerName: string;
  }

  export interface AddCompanyResponse extends BaseResponse {
    tokenData: AddCompanyData;
  }


export interface AddBranchData {
    id: string;
    location: string;
}

export interface AddBranchResponse extends BaseResponse {
    data: AddBranchData;
}