import { DataTypes, IntegerDataType, Model } from 'sequelize';
import db from '../config/connection';


interface QuestionAttributes {
  QuestionID:IntegerDataType,
  question:string,
  isMultipleChoice:boolean
}

export class Question extends Model<QuestionAttributes> {}

Question.init({
    QuestionID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    question: {
    type: DataTypes.STRING,  
    allowNull: false
    },
    isMultipleChoice:{
     type: DataTypes.BOOLEAN,
     allowNull: false   
    }},
    {
    sequelize: db,
    modelName: 'Question',
    timestamps:false  
    });