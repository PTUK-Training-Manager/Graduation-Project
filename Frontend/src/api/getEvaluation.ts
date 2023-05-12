import axiosInstance from 'src/api';
import {EvaluationFormResponse, EvaluationFormRequestBody, EvaluationFormRequestTrainerBody} from "./types";

export const getEvaluations = (body: EvaluationFormRequestBody) => {
  const url = '/training/evaluationFormForUniversity';
  return axiosInstance
    .post<EvaluationFormResponse>(url, body)
    .then((res) => res.data);
};

export const getEvaluationsForTrainer = (body: EvaluationFormRequestTrainerBody) => {
  const url = '/training/evaluationForm';
  return axiosInstance
    .post<EvaluationFormResponse>(url, body)
    .then((res) => res.data);
};