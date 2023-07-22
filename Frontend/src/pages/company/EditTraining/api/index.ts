import axiosInstance from 'src/api';
import { GetRunningTrainingsParams, GetCurrentTraineesResponse } from './types';
import { GetTrainersParams, GetTrainerssResponse } from '../../Trainers/api/types';

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

export const getTrainers = async (params: GetTrainersParams) => {
  return axiosInstance
    .get<GetTrainerssResponse>('/company/trainers', {
      params: {
        page: 0,
        size: 999,
      },
    })
    .then((response) => response.data);
};