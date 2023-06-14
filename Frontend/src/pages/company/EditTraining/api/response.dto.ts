export interface RunningTraineesData {
    id: string;
    studentId: string;
    companyBranchId: string;
    Student: {
      name: string;
    };
    CompanyBranch: {
      location: string;
    };
    Trainer: {
      name: string;
    };
    trainerId: string
  }
  
  export interface GetCurrentTraineesResponse{
    items: RunningTraineesData[];
    pageNumber: string;
    pageSzie: string;
    totalItems: number;
    totalPages: number;
  }
  