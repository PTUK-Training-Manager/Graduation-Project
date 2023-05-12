import axiosInstance from "src/api";
import { GetAllTrainingsResponse } from "./response.dto";


export const getAllTrainings = async (): Promise<GetAllTrainingsResponse> => {
  const url = "/training/trainings";
  const response = await axiosInstance.get<GetAllTrainingsResponse>(url);
  return response.data;
};
