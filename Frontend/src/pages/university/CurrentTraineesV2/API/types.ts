import {BaseResponse} from "src/types";

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

export interface CurrentTraineesResponse extends BaseResponse {
    data: RunningTraineesData[];
}

export interface GetRunningTrainingsParams {
    pageIndex: number; // page number
    pageSize: number; // page size
}