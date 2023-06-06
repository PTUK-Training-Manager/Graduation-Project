import { BaseResponse } from "src/types";

export interface GetTrainingRequestsData {
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
  
  export interface GetTrainingRequestsResponse extends BaseResponse {
    data: GetTrainingRequestsData[];
  }