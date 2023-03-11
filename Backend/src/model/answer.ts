import { DataTypes, IntegerDataType, Model } from 'sequelize';
import db from '../config/connection';


interface AnswerAttributes {
  AnswerID:IntegerDataType,
  answer:string
}

export class Answer extends Model<AnswerAttributes> {}

Answer.init({
    AnswerID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    answer: {
    type: DataTypes.STRING,  
    allowNull: false
    }},
    {
    sequelize: db,
    modelName: 'Answer',
    timestamps:false  
    });