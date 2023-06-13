export interface AllTrainingsData {
  id: string;
  studentId: string;
  companyBranchId: string;
  startDate: string;
  endDate: string;
  status: string;
  type: string;
  Student: {
    name: string;
  };
  CompanyBranch: {
    location: string;
  };
}
  
  export interface AllTrainingsResponse  {
    items: AllTrainingsData[];
    pageNumber: string;
    pageSzie: string;
    totalItems: number;
    totalPages: number;
  }
  