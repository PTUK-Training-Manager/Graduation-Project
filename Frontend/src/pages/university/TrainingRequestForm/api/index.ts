import axiosInstance from "src/api";
import {SubmitRequestBody} from "./request.dto";
import {SubmitRequestResponse} from "./response.dto";

export const submitRequest = async (body: SubmitRequestBody) => {
    const url = "/request/request";
    return axiosInstance.post<SubmitRequestResponse>(url, body).then(res => res.data);
};