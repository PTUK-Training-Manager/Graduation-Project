import axiosInstance from "src/api";
import { addTrainerRequestBody } from "./request.dto";
import { addTrainerResponse } from "./response.dto";

export const addTrainerRequest = (body: addTrainerRequestBody) => {
  const url = "/trainer/trainer";
  return axiosInstance
    .post<addTrainerResponse>(url, body)
    .then((res) => res.data);
};