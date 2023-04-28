import axiosInstance from "src/api";
import { deleteTrainerBody } from "./request.dto";
import { deleteTrainerResponse } from "./response.dto";

export const deleteTrianer = (body: deleteTrainerBody) => {
  const url = "/trainer/trainer";
  return axiosInstance
    .delete<deleteTrainerResponse>(url, { data: body })
    .then((res) => res.data);
};
