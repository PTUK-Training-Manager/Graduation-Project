import { BaseResponse } from "src/types";

export interface PendenigProgressData {
  endTime: string;
  id: string;
  noteId: string;
  skills: JSON;
  startTime: string;
  status: string;
  trainingId: string;
  date: string;
  Training: {
    StudentId: string;
    Student: {
      name: string;
    };
  };
}

export interface PendenigProgressResponse extends BaseResponse {
  data: PendenigProgressData[];
}
