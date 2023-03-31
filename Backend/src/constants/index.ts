import {UserRole,TrainingStatus} from "src/types";
import {UserRoleEnum,TrainingStatusEnum} from "src/enums";

export const USER_ROLES: UserRole[] = Object.values(UserRoleEnum);
export const TRAINING_STATUS : TrainingStatus[]=Object.values(TrainingStatusEnum);