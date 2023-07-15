import { UserRole, TrainingStatus, TrainingType, SemesterType, TrainerStatus, EvaluationType } from "../types";
import { UserRoleDisplayName, TrainingStatusEnum, TrainingTypeEnum, UserRoleEnum, SemesterEnum, TrainerStatusEnum, EvaluationStatusEnum } from "../enums";

export const USER_ROLES: UserRole[] = Object.values(UserRoleDisplayName);
export const USER_ROLES_IDS = Object.values(UserRoleEnum).filter(Number) as number[];
export const TRAINING_STATUS: TrainingStatus[] = Object.values(TrainingStatusEnum);
export const TRAINING_TYPE: TrainingType[] = Object.values(TrainingTypeEnum);
export const SEMESTER_TYPES: SemesterType[] = Object.values(SemesterEnum);
export const TRAINER_STATUSES: TrainerStatus[] = Object.values(TrainerStatusEnum);
export const EVALUATION_STATUS: EvaluationType[] = Object.values(EvaluationStatusEnum);
export const FIRST_TRAINING_HOURS = 200;
export const SECOND_TRAINING_HOURS  = 200;
export const COMPOUND_TRAINING_HOURS = FIRST_TRAINING_HOURS + SECOND_TRAINING_HOURS;
export const DEFAULT_PAGE_SIZE = 20;