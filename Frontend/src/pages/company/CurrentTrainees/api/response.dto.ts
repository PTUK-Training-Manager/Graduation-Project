export interface CurrentTraineesData {
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