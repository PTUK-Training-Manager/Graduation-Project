import { BaseResponse } from 'src/types';

export interface CurrentTraineesData {
  id: string;
  studentId: string;
  Student: {
    name: string;
  };
}

export interface GetCurrentTraineesResponse{
  items: CurrentTraineesData[];
  pageNumber: string;
  pageSzie: string;
  totalItems: number;
  totalPages: number;
}
