import axiosInstance from 'src/api';
import { GetTrainersResponse } from './response.dto';
import { DeleteTrainerBody, DeleteTrainerResponse,UpdateFieldforTrainerBody,UpdateFieldForTrainerResponse,AddTrainerRequestBody,AddTrainerResponse} from '../types';

export const getTrainers = async (): Promise<GetTrainersResponse> => {
  const url = '/company/trainers';
  const response = await axiosInstance.get<GetTrainersResponse>(url);
  return response.data;
};

export const deleteTrianer = (body: DeleteTrainerBody) => {
  const url = "/trainer/deactivateTrainer";
  return axiosInstance
    .patch<DeleteTrainerResponse>(url, body)
    .then((res) => res.data);
};

export const updateFieldForTrianer = (body: UpdateFieldforTrainerBody) => {
  const url = "/trainer/trainer";
  return axiosInstance
    .patch<UpdateFieldForTrainerResponse>(url, body)
    .then((res) => res.data);
};

export const addTrainerRequest = (body: AddTrainerRequestBody) => {
  const url = "/trainer/trainer";
  return axiosInstance
    .post<AddTrainerResponse>(url, body)
    .then((res) => res.data);
};