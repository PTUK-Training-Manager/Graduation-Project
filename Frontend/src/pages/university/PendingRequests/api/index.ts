import axiosInstance from "src/api";
import { BaseResponse } from "src/types";
import { DeleteRequestResponse } from "../types";
import { FetchUsersParams } from "./request.dto";
import { PendingRequestsResponse } from "./response.dto";

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
export const getPendingRequests = async (params: FetchUsersParams) => {
  return axiosInstance.get<PendingRequestsResponse>(
    `/request/pendingRequests/${params.page}/${params.size}` ,
    {
      params: {
        page: (params.page ?? 0) * (params.size ?? 10),
        size: params.size,
      },
    } 
  );
};


export const deleteRquest = (id: string) => {
  const url = `/request/request/${id}`;
  return axiosInstance.delete<DeleteRequestResponse>(url).then(res => res.data);
};