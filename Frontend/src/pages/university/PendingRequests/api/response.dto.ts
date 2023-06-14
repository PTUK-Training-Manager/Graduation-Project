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
export interface PendingRequestsResponse {
  items: PendingRequestsData[];
  pageNumber: string;
  pageSzie: string;
  totalItems: number;
  totalPages: number;
}
