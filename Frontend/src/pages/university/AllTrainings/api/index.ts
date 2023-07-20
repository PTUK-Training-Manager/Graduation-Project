import axiosInstance from 'src/api';
import {
 GetAllTrainingsDataParams,
 GetAllTrainingsDataResponse 
} from './types';

export const getAllTrainings = async (
  params: GetAllTrainingsDataParams
) => {
  const { pageIndex, pageSize } = params;

  return axiosInstance
    .get<GetAllTrainingsDataResponse>('/training/trainings', {
      params: {
        page: pageIndex,
        size: pageSize,
      },
    })
    .then((response) => response.data);
};
