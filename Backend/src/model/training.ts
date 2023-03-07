import { DataTypes, Model } from 'sequelize';
import db from '../config/connection';

import { EnumType } from 'typescript';
interface RoleAttributes {
  trainingId:number,
  type:EnumType,
  startDate:Date,
  endDate:Date,
  status:EnumType

}

export class Training extends Model<RoleAttributes> {}

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

Training.init({
  trainingId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: { 
      type: DataTypes.ENUM(TrainingType.first, TrainingType.second,TrainingType.compound),
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true
      },
    status: {
        type: DataTypes.ENUM(TrainingStatus.canceled,TrainingStatus.completed, TrainingStatus.pending,TrainingStatus.rejected, TrainingStatus.running, TrainingStatus.submitted),
        allowNull: false
      }},
    {
    sequelize: db ,
    modelName: 'Training',
    timestamps:false  
    });