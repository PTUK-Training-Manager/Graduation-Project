import axiosInstance from 'src/api';
import { BaseResponse } from 'src/types';

export interface AccessTokenData {
  id: string;
  studentId: string;
  type: string;
  companyBranchId: string;
  Student: {
    name: string;
  };
  CompanyBranch: {
    location: string;
  };
}

export interface GetTrainingRequestsResponse extends BaseResponse {
  data: AccessTokenData[];
}

export const getTrainingRequests =
  async (): Promise<GetTrainingRequestsResponse> => {
    const url = '/request/trainingRequests';
    const response = await axiosInstance.get<GetTrainingRequestsResponse>(url);
    return response.data;
  };