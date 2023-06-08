import { CreationOptional, DATEONLY, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from "../config/connection";
import {
  Note,
  Training
} from "src/models";
import { EvaluationType } from '../types';
import { EVALUATION_STATUS } from '../constants';
import { EvaluationStatusEnum } from '../enums';

export default class Evaluation extends Model<InferAttributes<Evaluation>, InferCreationAttributes<Evaluation>>{
  declare id: CreationOptional<number>;
  declare date: Date;
  declare startTime: Date;
  declare endTime: Date;
  declare status: EvaluationType;
  // declare status: string;
  declare skills: string;
  declare trainingId: ForeignKey<Training['id']>;
  declare noteId?: ForeignKey<Note['id']>;
}

Evaluation.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  date: {
    type: DATEONLY,
    allowNull: true,
},
  startTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM(...EVALUATION_STATUS),
    defaultValue: EvaluationStatusEnum.pending
  },
  skills: {
    type: DataTypes.JSON,
    allowNull: false
  }
},
  {
    sequelize,
    modelName: 'Evaluation',
    timestamps: false
  });
