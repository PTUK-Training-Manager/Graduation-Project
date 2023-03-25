import { DataTypes, InferAttributes, InferCreationAttributes, IntegerDataType, Model, NonAttribute } from 'sequelize';
import { EnumType } from 'typescript';
import db from '../config/connection';

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

// interface RoleAttributes {
//   trainingId: IntegerDataType;
//   type: TrainingType;
//   startDate: Date;
//   endDate: Date;
//   status: TrainingStatus;
// }

export default class Training extends Model<InferAttributes<Training>, InferCreationAttributes<Training>> {
declare trainingId: number;
declare type: typeof TrainingType;
declare startDate: Date;
declare endDate: Date;
declare status: typeof TrainingStatus;
declare studentId?:NonAttribute<string>;
declare companyId?:NonAttribute<number>;
declare trainerId?:NonAttribute<number>;


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
    sequelize: db,
    modelName: 'Training',
    timestamps: false,
  },
);