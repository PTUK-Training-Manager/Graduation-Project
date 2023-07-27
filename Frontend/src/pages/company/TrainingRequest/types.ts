import { BaseResponse } from "src/types";

export interface HandleTrainingRequestBody {
  trainingId: string;
  status: string;
}

export interface HandleTrainingRequestData {
  id: string;
}

export interface HandleTrainingRequestResponse extends BaseResponse {
  data: HandleTrainingRequestData;
}
