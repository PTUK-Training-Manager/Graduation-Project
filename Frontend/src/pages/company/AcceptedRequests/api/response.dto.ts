import { BaseResponse } from 'src/types';

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

export interface GetAcceptedTrainingsResponse extends BaseResponse {
  data: AcceptedTrainingsData[];
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
