import {BaseResponse} from "src/types";

export interface AddCompanyData {
  id: string;
  name: string;
  userId: string;
  User: {
    email:string;
  };
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
export interface GetCompanyData {
  map(arg0: (company: any) => { id: any; name: any; }): unknown;
  id: string;
  name: string;
  phoneNumber: string;
  managerName: string;
  userId: string;
  User: {
    email: string;
  };
}

export interface GetCompanyResponse extends BaseResponse {
  items: GetCompanyData[];
  pageNumber: string;
  pageSzie: string;
  totalItems: number;
  totalPages: number;
}