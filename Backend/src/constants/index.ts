import {UserRole, TrainingStatus, TrainingType, SemesterType,TrainerStatus} from "../types";
import {UserRoleDisplayName, TrainingStatusEnum, TrainingTypeEnum, UserRoleEnum, SemesterEnum,TrainerStatusEnum} from "../enums";

export const USER_ROLES: UserRole[] = Object.values(UserRoleDisplayName);
export const USER_ROLES_IDS = Object.values(UserRoleEnum).filter(Number) as number[];
export const TRAINING_STATUS: TrainingStatus[] = Object.values(TrainingStatusEnum);
export const TRAINING_TYPE: TrainingType[] = Object.values(TrainingTypeEnum);
export const Semester_Type: SemesterType[] = Object.values(SemesterEnum);

export const TRAINER_STATUS: TrainerStatus[] = Object.values(TrainerStatusEnum);