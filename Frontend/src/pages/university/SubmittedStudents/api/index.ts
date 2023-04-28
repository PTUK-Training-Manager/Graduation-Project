import axiosInstance from "src/api";
import { BaseResponse } from "src/types";

export interface AccessTokenData {
  id: string;
  trainerId: string;
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
}

export interface GetSubmittedStudentsResponse extends BaseResponse {
  data: AccessTokenData[];
}

export const getSubmittedStudents = async (): Promise<GetSubmittedStudentsResponse> => {
  const url = "/training/submittedStudents";
  const response = await axiosInstance.get<GetSubmittedStudentsResponse>(url);
  return response.data;
};
