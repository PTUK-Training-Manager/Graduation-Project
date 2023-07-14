import axiosInstance from 'src/api';
import { GetRunningTrainingsParams, GetCurrentTraineesResponse } from './types';

export const getCurrentTrainees = async (params: GetRunningTrainingsParams) => {
  const { pageIndex, pageSize } = params;

  return axiosInstance
    .get<GetCurrentTraineesResponse>('/training/runningTrainings', {
      params: {
        page: pageIndex,
        size: pageSize,
      },
    })
    .then((response) => response.data);
};
