import {BaseResponse} from "src/types";

export interface SubmitEvaluationData {
  id: string;
  companyId: string;
  field: string;
  name: string;
  status: string;
  userId: string;
}

export interface SubmitEvaluationResponse extends BaseResponse {
    data: SubmitEvaluationData;
}