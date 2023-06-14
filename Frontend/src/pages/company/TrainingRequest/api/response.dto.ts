import { BaseResponse } from "src/types";

export interface TrainingRequestsData {
    id: string;
    studentId: string;
    type: string;
    companyBranchId: string;
    Student: {
      name: string;
    };
    CompanyBranch: {
      location: string;
    };
  }
  
  export interface TrainingRequestsResponse {
    items: TrainingRequestsData[];
    pageNumber: string;
    pageSzie: string;
    totalItems: number;
    totalPages: number;
  }