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
    |'first'
    |'second'
    |'compound';


export interface LoginPayload {
    username: string,
    roleId: number
}