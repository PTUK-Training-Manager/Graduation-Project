export interface PendingRequestsData {
  id: string;
  studentId: string;
  companyBranchId: string;
  Student: {
    name: string;
  };
  CompanyBranch: {
    location: string;
    Company: {
      name: string;
    };
  };
}

export interface GetPendingRequestsParams {
  pageIndex: number; // page number
  pageSize: number; // page size
}

export interface GetPendingRequestsResponse {
  items: PendingRequestsData[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
