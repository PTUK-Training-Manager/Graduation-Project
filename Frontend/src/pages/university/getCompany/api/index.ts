import axiosInstance from "src/api";
import {getCompanyRequestBody} from "./request.dto";
import {getCompanyResponse} from "./response.dto";

export const getCompany = async (body: getCompanyRequestBody) => {
    const url = "/company/company";
    return axiosInstance.get<getCompanyResponse>(url).then(res => res.data);
};