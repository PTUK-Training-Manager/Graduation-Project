import { BaseResponse } from "src/types";

export interface AcceptedTrainingsData {
  id: string;
  studentId: string;
  companyBranchId: string;
  CompanyBranch: {
    location: string;
  };
  Student: {
    name: string;
  };
}

export interface GetAcceptedTrainingssParams {
  pageIndex: number; // page number
  pageSize: number; // page size
}

export interface GetAcceptedTrainingsResponse {
  items: AcceptedTrainingsData[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface AssignTrainerRequestBody {
  trainingId: string;
  trainerId: string;
  startDate?: Date;
}

export interface AssignTrainerData {
  id: string;
  companyId: string;
  field: string;
  name: string;
  status: string;
  userId: string;
}

export interface AssignTrainerRequestResponse extends BaseResponse {
  data: AssignTrainerData;
}
