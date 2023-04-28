import axiosInstance from "src/api";
import { updateTrainerBody } from "./request.dto";
import { updateTrainerResponse } from "./response.dto";

export const updateTrianer = (body: updateTrainerBody) => {
  const url = "/trainer/trainer";
  return axiosInstance
    .put<updateTrainerResponse>(url, { data: body })
    .then((res) => res.data);
};
