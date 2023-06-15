import axiosInstance from 'src/api';
import { GetTrainersResponse, TrainersResponse } from './response.dto';
import { DeleteTrainerBody,AddTrainerRequestBody,UpdateFieldforTrainerBody, FetchUsersParams } from './request.dto';
import { DeleteTrainerResponse,AddTrainerResponse,UpdateFieldForTrainerResponse,GetFieldResponse } from './response.dto';


export const getTrainers = async (params: FetchUsersParams) => {
  return axiosInstance.get<TrainersResponse>(
    `/company/trainers/${params.page}/${params.size}`,
    // {
    //   params: {
    //     page: (params.page ?? 0) * (params.size ?? 10),
    //     limit: params.size,
    //   },
    // }
  );
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

export const getField = async () => {
  const url = "/company/fields";
  return axiosInstance.get<GetFieldResponse>(url).then(res => res.data);
};