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

export type TrainingType=
    | "first"
    | "second"
    | "compound";


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
    success:boolean,
    status:any,
    message: string,
    data?: any;
  }