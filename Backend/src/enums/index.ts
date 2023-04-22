export enum UserRoleDisplayName {
    SUPER_ADMIN = "super admin",
    UNI_TRAINING_OFFICER = "university training officer",
    TRAINER = "trainer",
    STUDENT = "student",
    ADMIN_AND_REGISTRATION = "administration and registration",
    Company = "company",
}

export enum UserRoleEnum {
    SUPER_ADMIN = 1,
    UNI_TRAINING_OFFICER = 2,
    TRAINER = 3,
    STUDENT = 4,
    ADMIN_AND_REGISTRATION = 5,
    Company = 6
}

// const USER_ROLE_TO_NUMBER = {
//     SUPER_ADMIN: 1,
//     UNI_TRAINING_OFFICER: 2,
//     TRAINER: 3,
//     STUDENT: 4,
//     ADMIN_AND_REGISTRATION: 5,
//     COMPANY: 6,
// }
//
// export const eNumUserRole = (role: keyof typeof USER_ROLE_TO_NUMBER) => USER_ROLE_TO_NUMBER[role];

export enum TrainingStatusEnum {
    pending = 'pending',
    rejected = 'rejected',
    running = 'running',
    canceled = 'canceled',
    submitted = 'submitted',
    completed = 'completed',
    accepted = 'accepted'
}

export enum TrainingTypeEnum {
    first = 'first',
    second = 'second',
    compound = 'compound',
}
export enum SemesterEnum {
    first = 'first',
    second = 'second',
    summer = 'summer',
}
export enum TrainerStatusEnum {
    active = 'active',
    inactive = 'inactive',
}

export enum EvaluationStatusEnum {
    pending = 'pending',
    signed = 'signed',
    rejected = 'rejected'
}