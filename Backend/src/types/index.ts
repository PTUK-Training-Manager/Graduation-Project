export type UserRole =
    | "super admin"
    | "university training officer"
    | "trainer"
    | "student"
    | "administration and registration";

export interface LoginPayload {
    username: string,
    roleId: number
}