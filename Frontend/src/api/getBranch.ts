import axiosInstance from "src/api";
import {BaseResponse} from "src/types";

export interface GetBranchData {
    map(arg0: (branch: any) => { id: any; location: any; }): unknown;
    id: string;
    location: string;
}

export interface GetBranchRequestBody {
    companyId: string;
}
export interface GetBranchResponse extends BaseResponse {
    data: GetBranchData[];
}

export const getBranch = (body: GetBranchRequestBody) => {
    const url = "/company/branches";
    return axiosInstance.post<GetBranchResponse>(url, body).then(res => res.data);
};