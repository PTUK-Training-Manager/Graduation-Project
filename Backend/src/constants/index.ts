import { UserRole, TrainingStatus, TrainingType } from "src/types";
import { UserRoleEnum, TrainingStatusEnum, TrainingTypeEnum } from "src/enums";

export const USER_ROLES: UserRole[] = Object.values(UserRoleEnum);
export const TRAINING_STATUS: TrainingStatus[] = Object.values(TrainingStatusEnum);
export const TRAINING_TYPE: TrainingType[] = Object.values(TrainingTypeEnum);