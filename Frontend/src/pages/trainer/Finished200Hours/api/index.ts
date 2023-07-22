import { SubmitAnswersBody, SubmitAnswersResponse } from "../types";
import {FetchFinishedRequiredHoursParams, FinishedRequiredHoursResponse} from "./types";
import axiosInstance from "src/api";

// export const getTraineesFinishedRequiredHours = async (params: FetchUsersInfiniteParams) => {
//     return axios.get<UserData[]>(
//         "https://jsonplaceholder.typicode.com/comments", {
//             params: {
//                 _start: params.pageIndex * params.pageSize,
//                 _limit: params.pageSize,
//             }
//         }
//     )
// }

export const getTraineesFinishedRequiredHours = async (params: FetchFinishedRequiredHoursParams) => {
    const { pageIndex, pageSize } = params;
  
    return axiosInstance
      .get<FinishedRequiredHoursResponse>('/training/runningAndFinishedStudents', {
        params: {
          page: pageIndex,
          size: pageSize,
        },
      })
      .then((response) => response.data);
  };

  export const submitAnswers = (body: SubmitAnswersBody) => {
    const url = '/training/submitQuestions';
    return axiosInstance
      .post<SubmitAnswersResponse>(url, body)
      .then((res) => res.data);
  };