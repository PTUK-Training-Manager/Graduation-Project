import axiosInstance from 'src/api';
import {
  AddTrainerRequestBody,
  AddTrainerResponse,
  DeleteTrainerBody,
  DeleteTrainerResponse,
  GetFieldResponse,
  GetTrainersParams,
  GetTrainerssResponse,
  UpdateFieldForTrainerResponse,
  UpdateFieldforTrainerBody,
} from './types';

export const getTrainers = async (params: GetTrainersParams) => {
  const { pageIndex, pageSize } = params;

  return axiosInstance
    .get<GetTrainerssResponse>('/company/trainers', {
      params: {
        page: pageIndex,
        size: pageSize,
      },
    })
    .then((response) => response.data);
};

export const deleteTrianer = (body: DeleteTrainerBody) => {
  const url = '/trainer/deactivateTrainer';
  return axiosInstance
    .patch<DeleteTrainerResponse>(url, body)
    .then((res) => res.data);
};

export const updateFieldForTrianer = (body: UpdateFieldforTrainerBody) => {
  const url = '/trainer/trainer';
  return axiosInstance
    .patch<UpdateFieldForTrainerResponse>(url, body)
    .then((res) => res.data);
};

export const addTrainerRequest = (body: AddTrainerRequestBody) => {
  const url = '/trainer/trainer';
  return axiosInstance
    .post<AddTrainerResponse>(url, body)
    .then((res) => res.data);
};

export const getField = async () => {
  const url = '/company/fields';
  return axiosInstance.get<GetFieldResponse>(url).then((res) => res.data);
};
