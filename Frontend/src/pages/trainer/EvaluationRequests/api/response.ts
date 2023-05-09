import { BaseResponse } from "src/types";

export interface PendenigProgressData {
    endTime: string,
    id: string,
    noteId: string,
    skills: string,
    startTime: string,
    status: string,
    trainingId: string
    Training: {
        Student: {
            name: string;
            StudentId: string;
        };
    };
  }
  
  export interface PendenigProgressResponse extends BaseResponse {
    data: PendenigProgressData[];
  }