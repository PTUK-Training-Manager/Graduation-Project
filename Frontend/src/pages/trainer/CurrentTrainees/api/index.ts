import axiosInstance from "src/api";
import { BaseResponse } from "src/types";

export interface AccessTokenData {
  id: string;
  studentId: string;
  Student: {
    name: string;
  };
}

export interface GetCurrentTraineesResponse extends BaseResponse {
  data: AccessTokenData[];
}

export const getCurrentTrainees = async (): Promise<GetCurrentTraineesResponse> => {
  const url = "/training/runningTrainings";
  const response = await axiosInstance.get<GetCurrentTraineesResponse>(url);
  return response.data;
};
