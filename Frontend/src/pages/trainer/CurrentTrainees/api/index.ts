import axiosInstance from 'src/api';
import { FetchUsersParams } from './request.dto';
import { GetCurrentTraineesResponse } from './response.dto';

export const getCurrentTrainees = async (params: FetchUsersParams) => {
  return axiosInstance.get<GetCurrentTraineesResponse>(
    `/training/runningTrainings/${params.page}/${params.size}`/* ,
    {
      params: {
        start: (params.start ?? 0) * (params.limit ?? 10),
        limit: params.limit,
      },
    } */
  );
};