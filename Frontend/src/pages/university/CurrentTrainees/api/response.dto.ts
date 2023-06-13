import { BaseResponse } from 'src/types';

export interface RunningTraineesData {
  items: {
    id: string;
    studentId: string;
    companyBranchId: string;
    Student: {
      name: string;
    };
    CompanyBranch: {
      location: string;
      Company: {
        name: string;
      };
    };
  }[];
  pageNumber: string;
  pageSzie: string;
  totalItems: number;
  totalPages: number;
}

export interface GetCurrentTraineesResponse{
  items: RunningTraineesData[];
  pageNumber: string;
  pageSzie: string;
  totalItems: number;
  totalPages: number;
}
