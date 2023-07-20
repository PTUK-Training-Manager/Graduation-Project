import axiosInstance from 'src/api';
import {
  GetCompletedTrainingsParams,
  GetCompletedTraineesResponse,
} from './types';

export const getCompletedTrainees = async (
  params: GetCompletedTrainingsParams
) => {
  const { pageIndex, pageSize } = params;

  return axiosInstance
    .get<GetCompletedTraineesResponse>('/training/completedTrainings', {
      params: {
        page: pageIndex,
        size: pageSize,
      },
    })
    .then((response) => response.data);
};
