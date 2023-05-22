import axiosInstance from 'src/api';
import {AssignTrainerRequestBody} from './request.dto'
import { GetAcceptedTrainingsResponse,AssignTrainerRequestResponse } from './response.dto';


export const getAcceptedTrainings =
  async (): Promise<GetAcceptedTrainingsResponse> => {
    const url = '/training/acceptedTrainings';
    const response = await axiosInstance.get<GetAcceptedTrainingsResponse>(url);
    return response.data;
  };

  export const assignTrainer = (body: AssignTrainerRequestBody) => {
    const url = "/training/assignTrainer";
    return axiosInstance
      .patch<AssignTrainerRequestResponse>(url, body)
      .then((res) => res.data);
  };