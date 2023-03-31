import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, IntegerDataType, Model, NonAttribute } from 'sequelize';
import sequelize from "src/config/connection";
import Student from './student';
import CompanyBranch from './companyBranch';
import Trainer from './trainer';

 enum TrainingType {
  first = 'first',
  second = 'second',
  compound = 'compound',
}

enum TrainingStatus {
  pending = 'pending',
  rejected = 'rejected',
  running = 'running',
  canceled = 'canceled',
  submitted = 'submitted',
  completed = 'completed',
}

export default class Training extends Model<InferAttributes<Training>, InferCreationAttributes<Training>> {
declare trainingId: number;
declare type: typeof TrainingType;
declare startDate: Date;
declare endDate: Date;
declare status: typeof TrainingStatus;
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
      type: DataTypes.ENUM(
        TrainingType.first,
        TrainingType.second,
        TrainingType.compound,
      ),
      allowNull: false,
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
      type: DataTypes.ENUM(
        TrainingStatus.canceled,
        TrainingStatus.completed,
        TrainingStatus.pending,
        TrainingStatus.rejected,
        TrainingStatus.running,
        TrainingStatus.submitted,
      ),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Training',
    timestamps: false,
  },
);