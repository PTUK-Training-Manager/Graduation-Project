import axiosInstance from "src/api";
import { BaseResponse } from "src/types";

export interface GetStatusBody {
  status: string;
  count: number;
}
export interface GetStatusResponse extends BaseResponse {
  data: GetStatusBody[];
}

export const getCountStatus = async () => {
  const url = '/statistics/countStatus';
  return axiosInstance.get<GetStatusResponse>(url).then((res) => res.data);
};
