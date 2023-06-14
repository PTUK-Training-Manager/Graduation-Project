export interface SubmittedStudentsData {
    id: string;
    trainerId: string;
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
  }
  
  export interface SubmittedStudentsResponse {
    items: SubmittedStudentsData[];
    pageNumber: string;
    pageSzie: string;
    totalItems: number;
    totalPages: number;
  }