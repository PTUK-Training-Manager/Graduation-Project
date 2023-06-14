import axiosInstance from 'src/api';
import { TrainingRequestsResponse } from './response.dto';
import { HandleTrainingRequestBody, HandleTrainingRequestResponse } from '../types';
import { FetchUsersParams } from './request.dto';


export const getTrainingRequests = async (params: FetchUsersParams) => {
  return axiosInstance.get<TrainingRequestsResponse>(
    `/request/trainingRequests/${params.page}/${params.size}`,
    {
      params: {
        page: (params.page ?? 0) * (params.size ?? 10),
        size: params.size,
      },
    }
  );
};

  export const handleTrainingRequest = (body: HandleTrainingRequestBody) => {
    const url = "/training/changeTrainingStatus";
    return axiosInstance
      .patch<HandleTrainingRequestResponse>(url, body)
      .then((res) => res.data);
  };