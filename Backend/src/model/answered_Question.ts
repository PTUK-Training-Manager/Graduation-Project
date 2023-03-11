import { DataTypes, IntegerDataType, Model } from 'sequelize';
import db from '../config/connection';


interface answered_QuestionAttributes {
  answered_QuestionID:IntegerDataType
}

export class Answered_Question extends Model<answered_QuestionAttributes> {}

Answered_Question.init({
    answered_QuestionID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }},
    {
    sequelize: db,
    modelName: 'Answered_Question',
    timestamps:false  
    });