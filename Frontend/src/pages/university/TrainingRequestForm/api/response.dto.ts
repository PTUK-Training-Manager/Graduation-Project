import { BaseResponse } from "src/types";

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

export interface CompaniesData {
  id: string;
  name: string;
  phoneNumber: string;
  managerName: string;
  userId: string;
  User: {
    email: string;
  };
}

export interface GetCompaniesParams {
  pageIndex: number; // page number
  pageSize: number; // page size
}

export interface GetCompaniesResponse {
  items: CompaniesData[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
