export interface Row {
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

export interface Evaluation {
  companyBranchId: string;
  endDate: string;
  id: string;
  semester: string;
  startDate: string;
  status: string;
  studentId: string;
  trainerId: string;
  type: string;

  Trainer: {
    name: string;
  };

  Student: {
    id: string;
    name: string;
    phoneNumber: string;
    userId: string;
  };

  CompanyBranch: {
    Company: {
      name: string;
    };
    location: string;
  };

  Evaluations: {
    endTime: string;
    id: string;
    noteId: string;
    skills: string;
    startTime: string;
    status: string;
    trainingId: string;
  }[];
}