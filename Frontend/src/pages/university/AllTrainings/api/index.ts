import axiosInstance from "src/api";
import { BaseResponse } from "src/types";

export interface AccessTokenData {
  id: string;
  studentId: string;
  companyBranchId: string;
  startDate: string;
  endDate: string;
  semester: string;
  status: string;
  type: string;
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

export interface GetAllTrainingsResponse extends BaseResponse {
  data: AccessTokenData[];
}

export const getAllTrainings = async (): Promise<GetAllTrainingsResponse> => {
  const url = "/training/trainings";
  const response = await axiosInstance.get<GetAllTrainingsResponse>(url);
  return response.data;
};
