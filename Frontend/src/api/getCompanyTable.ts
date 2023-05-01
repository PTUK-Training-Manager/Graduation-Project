

import axiosInstance from "src/api";
import { BaseResponse } from 'src/types';

export interface CompanyTable {
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

export interface CompanyTableRequestBody {
    trainingId: string;
}

export interface CompanyTableResponse extends BaseResponse {
  data: CompanyTable;
}

export const progressForm = (body: CompanyTableRequestBody) => {
    const url = "/evaluation/progressForm";
    return axiosInstance.post<CompanyTableResponse>(url, body).then(res => res.data);
};