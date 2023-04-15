import {UserRole, TrainingStatus, TrainingType} from "../types";
import {UserRoleDisplayName, TrainingStatusEnum, TrainingTypeEnum, UserRoleEnum} from "../enums";

export const USER_ROLES: UserRole[] = Object.values(UserRoleDisplayName);
export const USER_ROLES_IDS = Object.values(UserRoleEnum).filter(Number) as number[];
export const TRAINING_STATUS: TrainingStatus[] = Object.values(TrainingStatusEnum);
export const TRAINING_TYPE: TrainingType[] = Object.values(TrainingTypeEnum);