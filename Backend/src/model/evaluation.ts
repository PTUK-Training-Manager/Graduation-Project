import { DataTypes, Model } from 'sequelize';
import db from '../config/connection';
interface EvaluationAttributes {
  Id:number,
  startTime:Date,
  endTime:Date,
  signed:boolean,
  skills:string
}

export class Evaluation extends Model<EvaluationAttributes> {}

Evaluation.init({
  Id: {
      type: DataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    signed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    skills: {
      type: DataTypes.STRING,
      allowNull: false
    }},
     {
      sequelize: db,
      modelName: 'Evaluation',
      timestamps:false 
    });