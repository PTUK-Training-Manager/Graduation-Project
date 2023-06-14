import { string } from 'joi';
import axiosInstance from 'src/api';
import { BaseResponse } from 'src/types';

export interface AddFieldDataRequestBody {
    fields:{
  id?: string;
  label?: string;
    }
}

export interface AddFieldData {
  id: string;
  location: string;
}

export interface AddFieldDataResponse extends BaseResponse {
  data: AddFieldData[];
}

export const addField = (body: AddFieldDataRequestBody) => {
  const url = '/company/fields';
  return axiosInstance
    .post<AddFieldDataResponse>(url, body)
    .then((res) => res.data);
};
