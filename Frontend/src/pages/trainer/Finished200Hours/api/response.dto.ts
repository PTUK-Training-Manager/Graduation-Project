export interface FinishedRequiredHoursData {
    studentId: string;
    Student: {
      name: string;
    };
    id: string;
  }
  export interface FinishedRequiredHoursResponse  {
    items: FinishedRequiredHoursData[];
    pageNumber: string;
    pageSzie: string;
    totalItems: number;
    totalPages: number;
  }