import { Request } from "express";
import { Evaluation } from "/models";

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

export interface LoginResponse extends BaseResponse {
    accessToken?: string;
}

export interface ButtonHandler extends Request {
    body: {
        index: number;
        studentId: string;
        trainingId: number;
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
    'pending'
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
        note: string,
        trainingId: number
    }
}

export interface EditEvaluationBody extends Request {
    body: {
        id: number,
        skills?: string,
        noteId?: number,
        note?: string,
        startTime?: Date,
        endTime?: Date
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
