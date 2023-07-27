import axiosInstance from "src/api";
import { BaseResponse } from "src/types";

export interface ProgressData {
  achievedHours: string;
  totalHours: string;
  progressForm: {
    endTime: string;
    id: string;
    noteId?: string;
    skills: JSON;
    startTime: string;
    status: string;
    trainingId: string;
  }[];
}

export interface ProgressFormRequestBody {
  trainingId: string;
}

export interface ProgressFormResponse extends BaseResponse {
  data: ProgressData;
}

export const progressForm = (body: ProgressFormRequestBody) => {
  const url = "/evaluation/progressForm";
  return axiosInstance.post<ProgressFormResponse>(url, body).then(res => res.data);
};
