import axiosInstance from "src/api";
import { BaseResponse } from "src/types";
import { FetchUsersParams } from "./request.dto";
import { SubmittedStudentsResponse } from "./response.dto";

export const getSubmittedStudents = async (params: FetchUsersParams) => {
  return axiosInstance.get<SubmittedStudentsResponse>(
    `/training/submittedStudents/${params.page}/${params.size}` ,
    {
      params: {
        page: (params.page ?? 0) * (params.size ?? 10),
        size: params.size,
      },
    } 
  );
};

