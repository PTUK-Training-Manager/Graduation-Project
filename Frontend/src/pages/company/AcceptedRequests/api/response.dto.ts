import { BaseResponse } from 'src/types';

export interface AccessTokenData {
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
    data: AccessTokenData[];
  }