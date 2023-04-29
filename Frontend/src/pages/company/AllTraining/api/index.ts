import axiosInstance from "src/api";
import { BaseResponse } from "src/types";

export interface AccessTokenData {
  id: string;
  studentId: string;
  companyBranchId: string;
  startDate: string;
  trainerId: string;
  endDate: string;
  status: string;
  type: string;
  Student: {
    name: string;
  };
  Trainer: {
    name: string;
  };
  CompanyBranch: {
    location: string;
  };
}

export interface GetAllTrainingsResponse extends BaseResponse {
  data: AccessTokenData[];
}

export const getAllTrainings = async (): Promise<GetAllTrainingsResponse> => {
  const url = "/training/trainings";
  const response = await axiosInstance.get<GetAllTrainingsResponse>(url);
  return response.data;
};