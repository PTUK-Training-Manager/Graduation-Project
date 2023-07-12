export interface RunningTraineesData {
    id: string;
    studentId: string;
    companyBranchId: string;
    Student: {
        name: string;
    };
    CompanyBranch: {
        location: string;
        Company: {
            name: string;
        };
    };
}

export interface GetRunningTrainingsParams {
    pageIndex: number; // page number
    pageSize: number; // page size
}

export interface GetCurrentTraineesResponse {
    items: RunningTraineesData[];
    pageNumber: string;
    pageSize: string;
    totalItems: number;
    totalPages: number;
}