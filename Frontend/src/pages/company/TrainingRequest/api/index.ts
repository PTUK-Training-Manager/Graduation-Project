import axiosInstance from "src/api";
import { GetTrainingRequestsParams, GetTrainingRequestsResponse } from "./types";
import { HandleTrainingRequestBody, HandleTrainingRequestResponse } from "../types";

export const getTrainingRequests = async (params: GetTrainingRequestsParams) => {
  const { pageIndex, pageSize } = params;

  return axiosInstance
    .get<GetTrainingRequestsResponse>("/request/trainingRequests", {
      params: {
        page: pageIndex,
        size: pageSize,
      },
    })
    .then(response => response.data);
};

export const handleTrainingRequest = (body: HandleTrainingRequestBody) => {
  const url = "/training/changeTrainingStatus";
  return axiosInstance.patch<HandleTrainingRequestResponse>(url, body).then(res => res.data);
};
