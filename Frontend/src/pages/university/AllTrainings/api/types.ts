export interface AllTrainingsData {
  id: string;
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
    CompanyBranch: {
      location: string;
      Company: {
        name: string;
      };
    };
}

export interface GetAllTrainingsDataParams {
  pageIndex: number; // page number
  pageSize: number; // page size
}

export interface GetAllTrainingsDataResponse {
  items: AllTrainingsData[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
