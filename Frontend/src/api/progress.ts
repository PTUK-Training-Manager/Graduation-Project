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

export interface progressFormRequestBody {
    trainingId: string;
}

export interface progressFormResponse extends BaseResponse {
  data: ProgressData;
}

export const progressForm = (body: progressFormRequestBody) => {
    const url = "/evaluation/progressForm";
    return axiosInstance.post<progressFormResponse>(url, body).then(res => res.data);
};