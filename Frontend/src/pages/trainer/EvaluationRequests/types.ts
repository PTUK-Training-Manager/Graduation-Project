import { BaseResponse } from "src/types";

export interface PendingProgressRequests {
  endTime: string;
  id: string;
  noteId: string;
  skills: string;
  startTime: string;
  status: string;
  date: string;
  trainingId: string;
  Training: {
    StudentId: string;
    Student: {
      name: string;
    };
  };
}

export interface AcceptEvaluationRequestBody {
  id: string;
}

export interface AcceptEvaluationRequestData {
  id: string;
}

export interface AcceptEvaluationRequestResponse extends BaseResponse {
  data: AcceptEvaluationRequestData;
}

export interface RejectEvaluationRequestBody {
  id: string;
  note: string;
}

export interface RejectEvaluationRequestData {
  id: string;
}

export interface RejectEvaluationRequestResponse extends BaseResponse {
  data: RejectEvaluationRequestData;
}
