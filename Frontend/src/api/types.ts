import {BaseResponse} from "src/types";

export interface EvaluationFormResponse extends BaseResponse {
    data: EvaluationData[];
}

export interface EvaluationData {
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

export interface EvaluationFormRequestBody {
    index: string;
    studentId: string;
}