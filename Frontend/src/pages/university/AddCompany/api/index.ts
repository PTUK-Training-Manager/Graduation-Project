import axiosInstance from "src/api";
import {AddCompanyRequestBody} from "./request.dto";
import {AddCompanyResponse} from "./response.dto";

export const addCompany = async (body: AddCompanyRequestBody) => {
    const url = "/company/company";
    return axiosInstance.post<AddCompanyResponse>(url, body).then(res => res.data);
};