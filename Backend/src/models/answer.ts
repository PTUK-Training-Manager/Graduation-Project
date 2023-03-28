import { DataTypes, InferAttributes, InferCreationAttributes, IntegerDataType, Model } from 'sequelize';
import sequelize from "src/config/connection";

export default class Answer extends Model<InferAttributes<Answer>, InferCreationAttributes<Answer>> {
 declare answerID: number;
 declare answer:string;
}

Answer.init({
    answerID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    answer: {
    type: DataTypes.STRING,  
    allowNull: false
    }},
    {
    sequelize,
    modelName: 'Answer',
    timestamps:false  
    });