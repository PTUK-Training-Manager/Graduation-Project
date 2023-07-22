export interface FetchFinishedRequiredHoursParams {
  pageIndex: number;
  pageSize: number;
}

export interface FinishedRequiredHoursData {
  studentId: string;
  name: string;
  id: string;
  type: string;
  semester: string;
  statDate: string;
  endDate: string;
  status: string;
  companyBranchId: string;
  trainerID: string;
  totalDuration: string;
}

export interface FinishedRequiredHoursResponse {
  items: FinishedRequiredHoursData[];
  pageNumber: string;
  pageSize: string;
  totalItems?: number;
  totalPages?: number;
}
