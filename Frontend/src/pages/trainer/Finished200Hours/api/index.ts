import axiosInstance from "src/api";
import { BaseResponse } from "src/types";
import { SubmitAnswersBody,SubmitAnswersResponse} from "../types";

export interface AccessTokenData {
  studentId: string;
  Student: {
    name: string;
  };
  id: string;
}

export interface GetCompletedTraineesResponseForTrainer extends BaseResponse {
  data: AccessTokenData[];
}

export const getCompletedTraineesForTrainer = async (): Promise<GetCompletedTraineesResponseForTrainer> => {
  const url = "/training/runningAndFinishedStudents";
  const response = await axiosInstance.get<GetCompletedTraineesResponseForTrainer>(url);
  return response.data;
};

export const submitAnswers = (body: SubmitAnswersBody) => {
  const url = '/training/submitQuestions';
  return axiosInstance
    .post<SubmitAnswersResponse>(url, body)
    .then((res) => res.data);
};