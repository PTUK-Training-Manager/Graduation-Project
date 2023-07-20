export interface SubmittedTraineesData {
  id: string;
  trainerId: string;
  studentId: string;
  companyBranchId: string;
  startDate: string;
  endDate: string;
  semester: string;
  status: string;
  type: string;
  Student: {
    name: string;
  };
}

export interface GetSubmittedTrainingsParams {
  pageIndex: number; // page number
  pageSize: number; // page size
}

export interface GetSubmittedTraineesResponse {
  items: SubmittedTraineesData[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
