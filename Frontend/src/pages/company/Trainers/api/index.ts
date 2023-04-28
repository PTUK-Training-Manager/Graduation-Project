import axiosInstance from 'src/api';
import { BaseResponse } from 'src/types';

export interface AccessTokenData {
  id: string;
  companyId: string;
  field: string;
  name: string;
  status: string;
  userId: string;
}

export interface GetTrainersResponse extends BaseResponse {
  data: AccessTokenData[];
}

export const getTrainers = async (): Promise<GetTrainersResponse> => {
  const url = '/trainer/trainers';
  const response = await axiosInstance.get<GetTrainersResponse>(url);
  return response.data;
};
