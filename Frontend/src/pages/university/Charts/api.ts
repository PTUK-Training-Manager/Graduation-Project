import axiosInstance from "src/api";
import { BaseResponse } from "src/types";

export interface GetStatusData {
  status: string;
  count: number;
}
export interface GetTypeData {
  type: string;
  count: number;
}
export interface GetCompanyData {
  companyName: string;
  studentCount: number;
}
export interface GetStatusResponse extends BaseResponse {
  data: GetStatusData[];
}
export interface GetTypeResponse extends BaseResponse {
  data: GetTypeData[];
}
export interface GetCompanyResponse extends BaseResponse {
  data: GetCompanyData[];
}
export const getCountStatus = async () => {
  const url = '/statistics/countStatus';
  return axiosInstance.get<GetStatusResponse>(url).then((res) => res.data);
};

export const getTypeStatus = async () => {
  const url = '/statistics/countTrainingsType';
  return axiosInstance.get<GetTypeResponse>(url).then((res) => res.data);
};
export const getCompanyStatus = async () => {
  const url = '/statistics/countTrainingsCompany';
  return axiosInstance.get<GetCompanyResponse>(url).then((res) => res.data);
};