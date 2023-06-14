import axiosInstance from "src/api";
import { GetAllTrainingsResponse } from "./response.dto";
import { FetchUsersParams } from "./request.dto";



export const getAllTrainings = async (params: FetchUsersParams) => {
  return axiosInstance.get<GetAllTrainingsResponse>(
    `/training/trainings/-1/-1` ,
    /* {
      params: {
        page: (params.page ?? 0) * (params.size ?? 10),
        size: params.size,
      },
    }  */
  );
};