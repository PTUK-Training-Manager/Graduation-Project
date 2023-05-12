import axiosInstance from "src/api";
import { BaseResponse } from "src/types";
import { DeleteRequestResponse } from "../types";

export interface AccessTokenData {
  id: string;
  studentId: string;
  companyBranchId: string;
  Student: {
    name: string;
  };
  CompanyBranch: {
    location: string;
    Company: {
      name: string;
    };
  };
}

export interface GetPendingRequestsResponse extends BaseResponse {
  data: AccessTokenData[];
}

export const getPendingRequests = async (): Promise<GetPendingRequestsResponse> => {
  const url = "/request/pendingRequests";
  const response = await axiosInstance.get<GetPendingRequestsResponse>(url);
  return response.data;
};
export const deleteRquest = (id: string) => {
  const url = `/request/request/${id}`;
  return axiosInstance.delete<DeleteRequestResponse>(url).then(res => res.data);
};