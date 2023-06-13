import axiosInstance from "src/api";
import {AddCompanyRequestBody, AddBranchRequestBody, FetchUsersParams} from "./request.dto";
import {AddCompanyResponse, AddBranchResponse, GetCompanyResponse} from "./response.dto";

export const addCompany = (body: AddCompanyRequestBody) => {
    const url = "/company/company";
    return axiosInstance.post<AddCompanyResponse>(url, body).then(res => res.data);
};

export const addBranch = (body: AddBranchRequestBody) => {
    const url = "/company/branch";
    return axiosInstance.post<AddBranchResponse>(url, body).then(res => res.data);
};

export const getCompany = async (params: FetchUsersParams) => {
    return axiosInstance.get<GetCompanyResponse>(
      `/company/company${params.page}/${params.size}`,
      {
        params: {
          page: (params.page ?? 0) * (params.size ?? 10),
          limit: params.size,
        },
      }
    );
  };
  
