import axiosInstance from "src/api";
import {
  GetAcceptedTrainingssParams,
  GetAcceptedTrainingsResponse,
  AssignTrainerRequestBody,
  AssignTrainerRequestResponse,
} from "./types";
import { GetTrainerssResponse } from "../../Trainers/api/types";

export const getAcceptedTrainings = async (params: GetAcceptedTrainingssParams) => {
  const { pageIndex, pageSize } = params;

  return axiosInstance
    .get<GetAcceptedTrainingsResponse>("/training/acceptedTrainings", {
      params: {
        page: pageIndex,
        size: pageSize,
      },
    })
    .then(response => response.data);
};

export const assignTrainer = (body: AssignTrainerRequestBody) => {
  const url = "/training/assignTrainer";
  return axiosInstance.patch<AssignTrainerRequestResponse>(url, body).then(res => res.data);
};

export const getTrainers = async () => {
  return axiosInstance
    .get<GetTrainerssResponse>("/company/trainers", {
      params: {
        page: 0,
        size: 999,
      },
    })
    .then(response => response.data);
};
