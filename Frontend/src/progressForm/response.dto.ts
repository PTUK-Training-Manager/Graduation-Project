import { BaseResponse } from 'src/types';

export interface AccessTokenData {
  achievedHours: string;
  totalHours: string;
  progressForm: 
    {
    endTime: string,
    id: string,
    noteId: string,
    skills: string,
    startTime: string,
    status: string,
    trainingId: string
    }[]
  ;
}

export interface progressFormResponse extends BaseResponse {
  data: AccessTokenData;
}