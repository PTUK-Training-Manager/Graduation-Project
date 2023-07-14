import {Request} from "express";
import {Evaluation} from "/models";

export type UserRole =
    | "super admin"
    | "university training officer"
    | "trainer"
    | "student"
    | "administration and registration"
    | "company";

export type TrainingStatus =
    | "pending"
    | "rejected"
    | "running"
    | "canceled"
    | "submitted"
    | "completed"
    | "accepted";

export type TrainingType =
    | "first"
    | "second"
    | "compound";

export type SemesterType =
    | "first"
    | "second"
    | "summer";

export type TrainerStatus =
    | "active"
    | "inactive";

export interface LoginPayload {
    username: string,
    roleId: number
}

export interface BaseErrorResponse extends BaseResponse {
    stack?: string;
    origin?: string;
}

export interface BaseResponse {
    success: boolean,
    status: number,
    message: string,
    data?: any;
}

export interface GridResponse {
    items: object[],
    pageNumber: number,
    pageSize: number,
    totalItems?: number,
    totalPages?: number
}

export interface ButtonHandler extends Request {
    body: {
        index: number;
        studentId: string;
        trainingId: number;
    }
}

interface ParsedQs { [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[] }

interface PaginationQuery extends ParsedQs {
    page: string;
    size: string;
}

export interface PaginatedRequest extends Request {
    query: PaginationQuery;
}

export interface AddedUser {
    username: string;
    password: string;
    email: string;
    saltRounds: number,
    roleId: number,
    name: string;
}

export interface CompanyRequestBody extends Request {
    body: {
        id: number;
        name: string;
        phoneNumber: string;
        email: string;
        location: string;
        managerName: string;
    }
}

export interface StudentRequestBody extends Request {
    body: {
        id: string;
        name: string;
        phoneNumber: string;
        email: string;
        department: string;
    }
}

export interface TrainingRequestBody extends Request {
    body: {
        roleId: number;
        trainingId: number;
        questionID: number;
        note: string;
        page: number;
    }
}

export interface EditTrainerRequestBody extends Request {
    body: {
        trainingId: number;
        trainerId: number;
        startDate?: Date;
    }
}

export interface BranchRequestBody extends Request {
    body: {
        companyId: number;
    }
}

export interface TrainerRequestBody extends Request {
    body: {
        id: number;
        name: string;
        email: string;
        fieldId: number;
        phoneNumber: string;
    }
}

interface MyJson {
    questionId: number;
    answerId: number;
    note: string;
}

export interface SubmitBody extends Request {
    body: {
        trainingId: number
        arrayData: MyJson[];
    }
}

export interface AddedRecord {
    trainingId: number;
    questionId: number;
    answerId?: number;
    noteId?: number;
}

export interface ChangeTrainingStatusBody extends Request {
    body: {
        trainingId: number;
        status: TrainingStatus;
    }
}

export interface ProgressFormBody extends Request {
    body: {
        trainingId: number;
    }
}

export interface ProgressFormWithHours {
    totalHours: number;
    achievedHours: number;
    progressForm: Evaluation[];
}

export type EvaluationType =
    | 'pending'
    | 'signed'
    | 'rejected';

export interface RejectEvaluationBody extends Request {
    body: {
        id: number,
        note: string
    }
}


export interface SubmitEvaluationBody extends Request {
    body: {
        startTime: string,
        startTimeType: string,
        endTime: string,
        endTimeType: string
        skills: string,
        trainingId: number,
        date: Date
    }
}

export interface EditEvaluationBody extends Request {
    body: {
        id: number,
        skills?: string,
        startTime?: string,
        startTimeType?: string,
        endTime?: string,
        endTimeType?: string,
        date?: Date
    }
}

export interface Field {
    id?: number;
    label: string
}

export interface AddFieldBody extends Request {
    body: {
        fields: Field[]
    }
}

export interface LoginResponse extends BaseResponse {
    accessToken?: string;
}