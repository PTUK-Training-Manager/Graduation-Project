import axiosInstance from "src/api";
import { BaseResponse } from "src/types";

export interface AccessTokenData {
  studentId: string;
  Student: {
    name: string;
  };
  count: string;
}

export interface GetCompletedTraineesResponse extends BaseResponse {
  data: AccessTokenData[];
}

export const getCompletedTrainees = async (): Promise<GetCompletedTraineesResponse> => {
  const url = "/training/completedTrainings";
  const response = await axiosInstance.get<GetCompletedTraineesResponse>(url);
  return response.data;
};
