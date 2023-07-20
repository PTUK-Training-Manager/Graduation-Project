import axiosInstance from 'src/api';
import {
  AddBranchRequestBody,
  AddBranchResponse,
  AddCompanyRequestBody,
  AddCompanyResponse,
  GetCompaniesParams,
  GetCompaniesResponse,
} from './types';

export const getCompanies = async (params: GetCompaniesParams) => {
  const { pageIndex, pageSize } = params;

  return axiosInstance
    .get<GetCompaniesResponse>('/company/company', {
      params: {
        page: pageIndex,
        size: pageSize,
      },
    })
    .then((response) => response.data);
};
export const addCompany = (body: AddCompanyRequestBody) => {
  const url = '/company/company';
  return axiosInstance
    .post<AddCompanyResponse>(url, body)
    .then((res) => res.data);
};

export const addBranch = (body: AddBranchRequestBody) => {
  const url = '/company/branch';
  return axiosInstance
    .post<AddBranchResponse>(url, body)
    .then((res) => res.data);
};
