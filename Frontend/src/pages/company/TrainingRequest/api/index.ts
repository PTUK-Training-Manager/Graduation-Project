import axiosInstance from 'src/api';
import { GetTrainingRequestsResponse } from './response.dto';
import { HandleTrainingRequestBody, HandleTrainingRequestResponse } from '../types';



export const getTrainingRequests =
  async (): Promise<GetTrainingRequestsResponse> => {
    const url = '/request/trainingRequests';
    const response = await axiosInstance.get<GetTrainingRequestsResponse>(url);
    return response.data;
  };
  export const handleTrainingRequest = (body: HandleTrainingRequestBody) => {
    const url = "/training/changeTrainingStatus";
    return axiosInstance
      .patch<HandleTrainingRequestResponse>(url, body)
      .then((res) => res.data);
  };