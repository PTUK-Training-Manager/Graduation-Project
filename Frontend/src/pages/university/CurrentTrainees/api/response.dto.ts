import {BaseResponse} from 'src/types';

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
};

export interface GetCurrentTraineesResponse {
    items: RunningTraineesData[];
    pageNumber: string;
    pageSize: string;
    totalItems: number;
    totalPages: number;
}
