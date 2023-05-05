import axiosInstance from 'src/api';
import {EvaluationFormResponse, EvaluationFormRequestBody} from "./types";

export const getEvaluations = (body: EvaluationFormRequestBody) => {
  const url = '/training/evaluationForm';
  return axiosInstance
    .post<EvaluationFormResponse>(url, body)
    .then((res) => res.data);
};