import axiosInstance from "src/api";
import { BaseResponse } from "src/types";
import { SubmitAnswersBody,SubmitAnswersResponse} from "../types";
import { FetchUsersParams } from "./request.dto";
import { FinishedRequiredHoursResponse } from "./response.dto";

export const getTraineesFinishedRequiredHours = async (params: FetchUsersParams) => {
  return axiosInstance.get<FinishedRequiredHoursResponse>(
    `/training/runningAndFinishedStudents/${params.page}/${params.size}`,
    {
      params: {
        page: (params.page ?? 0) * (params.size ?? 10),
        size: params.size,
      },
    }
  );
};


export const submitAnswers = (body: SubmitAnswersBody) => {
  const url = '/training/submitQuestions';
  return axiosInstance
    .post<SubmitAnswersResponse>(url, body)
    .then((res) => res.data);
};