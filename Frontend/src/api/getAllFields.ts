import axiosInstance from 'src/api';
import { BaseResponse } from 'src/types';

export interface GetAllFieldsData {
  id: string;
  field: string;
}

export interface GetAllFieldsResponse extends BaseResponse {
  data: GetAllFieldsData[];
}

export const getAllFields = async () => {
  const url = '/company/allFields';
  return axiosInstance.get<GetAllFieldsResponse>(url).then((res) => res.data);
};
