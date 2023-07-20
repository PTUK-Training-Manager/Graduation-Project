import { BaseResponse } from "src/types";

export interface Row {
    studentId: string;
    Student: {
        name: string;
    };
    count: string;
}

export interface SubmitAnswersBody{
  trainingId: string;
  arrayData: {
    questionId: string;
    answerId: string | null;
    note: string | null;
  }[];
}
export interface SubmitAnswersData {
  id: string;
  companyId: string;
  fieldId: string;
  Field: {
    id: string;
    field: string;
  };
  name: string;
  status: string;
  userId: string;
}

export interface SubmitAnswersResponse extends BaseResponse {
  data: SubmitAnswersData;
}
export interface Evaluation {
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

import {DataGridFetchQuery} from "src/components/DataGridTanstack/types";

export interface UseInfiniteDataGridPlaygroundAPIProps {
    query: DataGridFetchQuery;
}