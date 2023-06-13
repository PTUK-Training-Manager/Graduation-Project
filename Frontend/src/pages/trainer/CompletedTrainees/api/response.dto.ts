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
  export interface CompletedTraineesResponse  {
    items: CompletedTraineesData[];
    pageNumber: string;
    pageSzie: string;
    totalItems: number;
    totalPages: number;
  }