import axiosInstance from "src/api";
import {AddBranchRequestBody} from "./request.dto";
import {AddBranchResponse} from "./response.dto";

export const addBranch = async (body: AddBranchRequestBody) => {
    const url = "/company/branch";
    return axiosInstance.post<AddBranchResponse>(url, body).then(res => res.data);
};