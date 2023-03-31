import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, IntegerDataType, Model, NonAttribute } from 'sequelize';
import sequelize from "src/config/connection";


import {TrainingStatus,TrainingType} from "src/types";
import {TrainingStatusEnum,TrainingTypeEnum} from "src/enums";
import {TRAINING_STATUS,TRAINING_TYPE} from "src/constants";
import Student from './student';
import CompanyBranch from './companyBranch';
import Trainer from './trainer';

//  enum TrainingType {
//   first = 'first',
//   second = 'second',
//   compound = 'compound',
// }

// enum TrainingStatus {
//   pending = 'pending',
//   rejected = 'rejected',
//   running = 'running',
//   canceled = 'canceled',
//   submitted = 'submitted',
//   completed = 'completed',
// }

export default class Training extends Model<InferAttributes<Training>, InferCreationAttributes<Training>> {
declare trainingId: number;
declare type: TrainingType;
declare startDate: Date;
declare endDate: Date;
declare status:  TrainingStatus;
declare studentId: ForeignKey<Student['studentId']>;
declare companyBranchId:ForeignKey<CompanyBranch['id']>;
declare trainerId:ForeignKey<Trainer['trainerId']>;

}

Training.init(
  {
    trainingId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM(...TRAINING_TYPE),
      allowNull: false,
      defaultValue:TrainingStatusEnum.pending
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(...TRAINING_STATUS),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Training',
    timestamps: false,
  },
);