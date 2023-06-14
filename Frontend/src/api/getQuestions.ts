import axiosInstance from 'src/api';
import { BaseResponse } from 'src/types';

export interface QuestionsRequestBodyData {
  role: number;
}

export interface QuestionsRequestData {
  id: string;
  isMultipleChoice: boolean;
  roleId: number;
  question: string;
}

export interface QuestionsRequestDataResponse extends BaseResponse {
  data: QuestionsRequestData[];
}

export const getQuestion = () => {
  const url = '/training/questions';
  return axiosInstance
    .get<QuestionsRequestDataResponse>(url)
    .then((res) => res.data);
};
