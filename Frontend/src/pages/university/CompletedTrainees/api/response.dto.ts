export interface CompletedTraineesData {
    studentId: string;
    Student: {
      name: string;
    };
    count: string;
  }
  export interface CompletedTraineesResponse {
    items: CompletedTraineesData[];
    pageNumber: string;
    pageSzie: string;
    totalItems: number;
    totalPages: number;
  }