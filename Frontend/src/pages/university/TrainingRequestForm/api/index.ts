import axiosInstance from "src/api";
import {SubmitRequestBody} from "./request.dto";
import {SubmitRequestResponse} from "./response.dto";
import { FetchUsersParams } from "../../PendingRequests/api/request.dto";
import { GetCompanyResponse } from "../../Companies/api/response.dto";

export const submitRequest = async (body: SubmitRequestBody) => {
    const url = "/request/request";
    return axiosInstance.post<SubmitRequestResponse>(url, body).then(res => res.data);
};


  export const getCompany = async () => {
    const url = "/company/company";
    return axiosInstance.get<GetCompanyResponse>(url).then(res => res.data);
};