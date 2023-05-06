import axiosInstance from 'src/api';
import {EvaluationFormResponse, EvaluationFormRequestBody} from "./types";

export const getEvaluations = (body: EvaluationFormRequestBody) => {
  const url = '/training/evaluationFormForUniversity';
  return axiosInstance
    .post<EvaluationFormResponse>(url, body)
    .then((res) => res.data);
};