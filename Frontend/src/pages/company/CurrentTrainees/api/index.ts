import axiosInstance from 'src/api';
import { FetchUsersParams } from './request.dto';
import { GetCurrentTraineesResponse } from './response.dto';

export const getCurrentTrainees = async (params: FetchUsersParams) => {
  return axiosInstance.get<GetCurrentTraineesResponse>(
    `/training/runningTrainings/${params.page}/${params.size}`,
    {
      params: {
        page: (params.page ?? 0) * (params.size ?? 10),
        limit: params.size,
      },
    }
  );
};
