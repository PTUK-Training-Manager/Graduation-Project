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
    | "completed";

export type TrainingType =
    | "first"
    | "second"
    | "compound";

export type SemesterType =
    | "first"
    | "second"
    | "summer";

export interface LoginPayload {
    username: string,
    roleId: number
}

export interface ErrorResponse {
    stack?: any;
    code: number;
    message: string;
    // details?: string | string[];
    data?: string;
}

export interface GeneratedResponse {
    success: boolean,
    status: any,
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
        role: number;
        trainingId: number;
        questionID: number;
        note: string;
        page: number;
    }
}

export interface BranchRequestBody extends Request {
    body: {
        companyId: number;
    }
}
