import axiosInstance from "src/api";
import { FetchUsersParams } from "./request.dto";
import { CompletedTraineesResponse } from "./response.dto";

export const getCompletedTrainees = async (params: FetchUsersParams) => {
  return axiosInstance.get<CompletedTraineesResponse>(
    `/training/completedTrainings/${params.page}/${params.size}`,
    {
      params: {
        page: (params.page ?? 0) * (params.size ?? 10),
        size: params.size,
      },
    }
  );
};
