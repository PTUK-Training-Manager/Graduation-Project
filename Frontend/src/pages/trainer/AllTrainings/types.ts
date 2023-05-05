export interface Row {
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