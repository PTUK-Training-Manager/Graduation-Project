import axiosInstance from "src/api";
import { BaseResponse } from 'src/types';

export interface ProgressData {
  achievedHours: string;
  totalHours: string;
  progressForm: 
    {
    endTime: string,
    id: string,
    noteId: string,
    skills: string,
    startTime: string,
    status: string,
    trainingId: string
    }[]
  ;
}

export interface EvaluationFormRequestBody {
    index: string;
    studentId: string;
}

export interface EvaluationFormResponse extends BaseResponse {
  data: ProgressData;
}

export const evaluation = (body: EvaluationFormRequestBody) => {
    const url = "/training/evaluationForm";
    return axiosInstance.post<EvaluationFormResponse>(url, body).then(res => res.data);
};