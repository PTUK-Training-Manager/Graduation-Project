import axiosInstance from "src/api";
import {getCompanyResponse} from "./response.dto";

export const getCompany = async () => {
    const url = "/company/company";
    return axiosInstance.get<getCompanyResponse>(url).then(res => res.data);
};