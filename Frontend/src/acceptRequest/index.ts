import axiosInstance from "src/api";
import { handleTrainingRequestBody } from "./request.dto";
import { handleTrainingRequestResponse } from "./response.dto";

export const handleTrainingRequest = (body: handleTrainingRequestBody) => {
  const url = "/training/changeTrainingStatus";
  return axiosInstance
    .patch<handleTrainingRequestResponse>(url, body)
    .then((res) => res.data);
};