import axiosInstance from "src/api";
import { BaseResponse } from "src/types";

export interface AccessTokenData {
  id: string;
  name: string;
  phoneNumber: string;
  userId: string;
}

export interface GetAllStudentsResponse extends BaseResponse {
  data: AccessTokenData[];
}

export const getAllStudents = async (): Promise<GetAllStudentsResponse> => {
  const url = "/student/students";
  const response = await axiosInstance.get<GetAllStudentsResponse>(url);
  return response.data;
};
