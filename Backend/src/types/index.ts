import { Request } from "express";

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
}

export interface BaseResponse {
    success: boolean,
    status: number,
    message: string,
    data?: any;
}

export interface ButtonHandler extends Request {
    body: {
        index: number;
        studentId: string;
        trainingId?: number;
    }
}

export interface AddedUser {
    username: string;
    password: string;
    email: string;
    saltRounds: number,
    roleId: number
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
        userId: number;
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
        field: string;
        username: string;
        password: string;
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