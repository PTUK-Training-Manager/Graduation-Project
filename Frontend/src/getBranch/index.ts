import axiosInstance from "src/api";
import {getBranchRequestBody} from "./request.dto";
import {getBranchResponse} from "./response.dto";

export const getBranch = (body: getBranchRequestBody) => {
    const url = "/company/branches";
    return axiosInstance.post<getBranchResponse>(url, body).then(res => res.data);
};