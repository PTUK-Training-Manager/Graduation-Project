import axiosInstance from 'src/api';
import {
 GetSubmittedTrainingsParams,
 GetSubmittedTraineesResponse
} from './types';

export const getSubmitteddTrainees = async (
  params: GetSubmittedTrainingsParams
) => {
  const { pageIndex, pageSize } = params;

  return axiosInstance
    .get<GetSubmittedTraineesResponse>('/training/submittedStudents', {
      params: {
        page: pageIndex,
        size: pageSize,
      },
    })
    .then((response) => response.data);
};
