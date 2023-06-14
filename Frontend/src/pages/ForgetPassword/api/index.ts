import axiosInstance from 'src/api';
import { BaseResponse } from 'src/types';

export interface GetAllFieldsData {
  id: string;
  field: string;
}

export interface GetAllFieldsResponse extends BaseResponse {
  data: GetAllFieldsData[];
}

export const getForgetPage = async () => {
  const url = '/user/enterData';
  return axiosInstance.get<GetAllFieldsResponse>(url).then((res) => res.data);
};
