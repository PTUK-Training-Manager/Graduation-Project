export enum UserRoleEnum {
    SUPER_ADMIN = "super admin",
    UNI_TRAINING_OFFICER = "university training officer",
    TRAINER = "trainer",
    STUDENT = "student",
    ADMIN_AND_REGISTRATION = "administration and registration",
    Company = "company",
}
export enum TrainingStatusEnum {
    pending = 'pending',
    rejected = 'rejected',
    running = 'running',
    canceled = 'canceled',
    submitted = 'submitted',
    completed = 'completed',
  }

export enum TrainingTypeEnum {
    first = 'first',
    second = 'second',
    compound = 'compound',
  }