export interface TrainingRequestsData {
  id: string;
  studentId: string;
  type: string;
  companyBranchId: string;
  Student: {
    name: string;
  };
  CompanyBranch: {
    location: string;
  };
}

export interface GetTrainingRequestsParams {
  pageIndex: number; // page number
  pageSize: number; // page size
}

export interface GetTrainingRequestsResponse {
  items: TrainingRequestsData[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
