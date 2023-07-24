import axiosInstance from "src/api";
import { PendenigProgressResponse } from "./response";
import {
  AcceptEvaluationRequestBody,
  AcceptEvaluationRequestResponse,
  RejectEvaluationRequestBody,
  RejectEvaluationRequestResponse,
} from "../types";

export const getPendingEvaluations = async (): Promise<PendenigProgressResponse> => {
  const url = "/evaluation/pendingEvaluations";
  const response = await axiosInstance.get<PendenigProgressResponse>(url);
  return response.data;
};

export const acceptEvaluationRequest = (body: AcceptEvaluationRequestBody) => {
  const url = "/evaluation/sign";
  return axiosInstance.patch<AcceptEvaluationRequestResponse>(url, body).then(res => res.data);
};

export const rejectEvaluationRequest = (body: RejectEvaluationRequestBody) => {
  const url = "/evaluation/reject";
  return axiosInstance.post<RejectEvaluationRequestResponse>(url, body).then(res => res.data);
};
