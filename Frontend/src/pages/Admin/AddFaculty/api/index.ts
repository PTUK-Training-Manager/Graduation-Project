import axiosInstance from "src/api";
import {AploadExcelFileBody} from "./request.dto";
import {AploadExcelFileResponse} from "./response.dto";

export const aploadExcelFile = async (body: AploadExcelFileBody) => {
    const url = "/admin/upload";
    return axiosInstance.post<AploadExcelFileResponse>(url, body).then(res => res.data);
};