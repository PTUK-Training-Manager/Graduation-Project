import { DataTypes, InferAttributes, InferCreationAttributes, IntegerDataType, Model, NonAttribute } from 'sequelize';
import sequelize from "src/config/connection";

// interface EvaluationAttributes {
//   id:IntegerDataType,
//   startTime:Date,
//   endTime:Date,
//   signed:boolean,
//   skills:string
// }

export default class Evaluation extends Model<InferAttributes<Evaluation>, InferCreationAttributes<Evaluation>>{
declare id: number;
declare startTime: Date;
declare endTime: Date;
declare signed: boolean;
declare skills: string;
declare trainingId?: NonAttribute<number>;
declare noteId?: NonAttribute<number>; 

}

Evaluation.init({
  id: {
      type: DataTypes.INTEGER,
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
      sequelize,
      modelName: 'Evaluation',
      timestamps:false 
    });