import axiosInstance from "src/api";
import { FetchUsersParams } from "./request.dto";
import { AllTrainingsResponse } from "./response.dto";


export const getAllTrainings = async (params: FetchUsersParams) => {
  return axiosInstance.get<AllTrainingsResponse>(
    `/training/trainings/${params.page}/${params.size}`,
    {
      params: {
        page: (params.page ?? 0) * (params.size ?? 10),
        size: params.size,
      },
    }
  );
};
