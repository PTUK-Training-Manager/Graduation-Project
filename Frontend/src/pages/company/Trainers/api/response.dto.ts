import { BaseResponse } from "src/types";

export interface TrainersData {
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
  
  export interface GetTrainersResponse extends BaseResponse {
    data: TrainersData[];
  }