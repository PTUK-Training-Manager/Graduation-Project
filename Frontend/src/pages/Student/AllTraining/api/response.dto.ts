import { BaseResponse } from "src/types";

export interface AllTrainingsData {
    id: string;
    studentId: string;
    companyBranchId: string;
    startDate: string;
    endDate: string;
    semester: string;
    status: string;
    type: string;
    Student: {
      name: string;
    };
    CompanyBranch: {
      location: string;
      Company: {
        name: string;
      };
    };
  }
  
  export interface GetAllTrainingsResponse extends BaseResponse {
    data: AllTrainingsData[];
  }