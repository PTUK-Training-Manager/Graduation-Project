import axiosInstance from 'src/api';
import {AssignTrainerRequestBody,FetchUsersParams} from './request.dto'
import { AcceptedTrainingsResponse,AssignTrainerRequestResponse } from './response.dto';




  export const assignTrainer = (body: AssignTrainerRequestBody) => {
    const url = "/training/assignTrainer";
    return axiosInstance
      .patch<AssignTrainerRequestResponse>(url, body)
      .then((res) => res.data);
  };
  export const getAcceptedTrainings = async (params: FetchUsersParams) => {
    return axiosInstance.get<AcceptedTrainingsResponse>(
      `/training/acceptedTrainings/${params.page}/${params.size}`,
      {
        params: {
          page: (params.page ?? 0) * (params.size ?? 10),
          size: params.size,
        },
      }
    );
  };