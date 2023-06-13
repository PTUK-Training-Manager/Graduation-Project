import axiosInstance from "src/api";
import { AllTrainingResponse } from "./response.dto";
import { FetchUsersParams } from "./request.dto";

export const getAllTrainings = async (params: FetchUsersParams) => {
  return axiosInstance.get<AllTrainingResponse>(
    `/training/trainings/${params.start}/${params.limit}`,
    {
      params: {
        start: (params.start ?? 0) * (params.limit ?? 10),
        limit: params.limit,
      },
    }
  );
};