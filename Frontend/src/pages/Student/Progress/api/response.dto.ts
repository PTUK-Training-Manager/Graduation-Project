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
export interface EditEvaluationData {
  id: string;
  companyId: string;
  field: string;
  name: string;
  status: string;
  userId: string;
}

export interface EditEvaluationResponse extends BaseResponse {
    data: EditEvaluationData;
}

export interface TrainingRunningIDData {
  trainingId: number;
}

export interface TrainingRunningIDResponse extends BaseResponse {
    data: TrainingRunningIDData;
}

export interface RejectedEvaluationData {
  id: number,
  startTime: string,
  endTime: string,
  skills: string,
  trainingId: number | undefined,
  date:string,
  noteId: number,
  status: string,
  Note: {
    note: string;
  };
}


export interface RejectedEvaluationResponse extends BaseResponse {
    data: RejectedEvaluationData[];
}

export interface PendingEvaluationData {
  id: number,
  startTime: string,
  endTime: string,
  skills: string,
  trainingId: number | undefined,
  date:string,
  noteId: number,
  status: string,
}


export interface PejectedEvaluationResponse extends BaseResponse {
    data: PendingEvaluationData[];
}
