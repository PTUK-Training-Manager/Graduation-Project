import axiosInstance from "src/api";
import { updateTrainerBody } from "./request.dto";
import { updateTrainerResponse } from "./response.dto";

export const updateTrianer = (body: updateTrainerBody) => {
  const url = "/trainer/trainer";
  return axiosInstance
    .patch<updateTrainerResponse>(url, body)
    .then((res) => res.data);
};