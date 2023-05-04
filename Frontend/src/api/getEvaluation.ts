import axiosInstance from 'src/api';
import { BaseResponse } from 'src/types';

export interface EvaluateData {
  companyBranchId: string;
  endDate: string;
  id: string;
  semester: string;
  startDate: string;
  status: string;
  studentId: string;
  trainerId: string;
  type: string;

  Trainer: {
    name: string;
  };

  Student: {
    id: string;
    name: string;
    phoneNumber: string;
    userId: string;
  };

  CompanyBranch: {
    Company: {
      name: string;
    };
    location: string;
  };

  Evaluations: {
    endTime: string;
    id: string;
    noteId: string;
    skills: string;
    startTime: string;
    status: string;
    trainingId: string;
  }[];
}

export interface EvaluationFormRequestBody {
  index: string;
  studentId: string;
}

export interface EvaluationFormResponse extends BaseResponse {
  data: EvaluateData;
}

export const evaluation = (body: EvaluationFormRequestBody) => {
  const url = '/training/evaluationForm';
  return axiosInstance
    .post<EvaluationFormResponse>(url, body)
    .then((res) => res.data);
};
