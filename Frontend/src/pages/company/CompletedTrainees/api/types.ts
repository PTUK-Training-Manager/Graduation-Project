export interface CompletedTraineesData {
  studentId: string;
  Student: {
    name: string;
  };
  CompanyBranch: {
    location: string;
  };
  Trainer: {
    name: string;
  };
  count: string;
  companyBranchId: string;
  id: string;
  trainerId: string;
}

export interface GetCompletedTrainingsParams {
  pageIndex: number; // page number
  pageSize: number; // page size
}

export interface GetCompletedTraineesResponse {
  items: CompletedTraineesData[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
