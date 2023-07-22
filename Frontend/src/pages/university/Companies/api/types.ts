import { BaseResponse } from 'src/types';

export interface AddCompanyData {
  id: string;
  name: string;
  userId: string;
  User: {
    email: string;
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

export interface AddCompanyRequestBody {
  id: string;
  name: string;
  email: string;
  location: string;
  phoneNumber: string;
  managerName: string;
}

export interface AddBranchRequestBody {
  id: string;
  location: string;
}