import axiosInstance from "src/api";
import { assignTrainerRequestBody } from "./request.dto";
import { assignTrainerRequestResponse } from "./response.dto";

export const assignTrainer = (body: assignTrainerRequestBody) => {
  const url = "/training/assignTrainer";
  return axiosInstance
    .patch<assignTrainerRequestResponse>(url, body)
    .then((res) => res.data);
};