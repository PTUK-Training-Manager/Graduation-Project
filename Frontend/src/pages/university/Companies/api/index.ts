import axiosInstance from "src/api";
import {AddCompanyRequestBody, AddBranchRequestBody} from "./request.dto";
import {AddCompanyResponse, AddBranchResponse} from "./response.dto";

export const addCompany = (body: AddCompanyRequestBody) => {
    const url = "/company/company";
    return axiosInstance.post<AddCompanyResponse>(url, body).then(res => res.data);
};

export const addBranch = (body: AddBranchRequestBody) => {
    const url = "/company/branch";
    return axiosInstance.post<AddBranchResponse>(url, body).then(res => res.data);
};