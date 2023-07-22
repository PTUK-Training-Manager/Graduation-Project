export interface RunningTraineesData {
  id: string;
  studentId: string;
  Student: {
    name: string;
  };
}

export interface GetRunningTrainingsParams {
  pageIndex: number; // page number
  pageSize: number; // page size
}

export interface GetCurrentTraineesResponse {
  items: RunningTraineesData[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
