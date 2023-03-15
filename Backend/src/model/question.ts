import { DataTypes, InferAttributes, InferCreationAttributes, IntegerDataType, Model, NonAttribute } from 'sequelize';
import db from '../config/connection';


// interface QuestionAttributes {
//   questionID:IntegerDataType,
//   question:string,
//   isMultipleChoice:boolean
// }

export class Question extends Model<InferAttributes<Question>, InferCreationAttributes<Question>> {
declare questionID: number;
declare question:string;
declare isMultipleChoice: boolean;
declare roleId?:NonAttribute<number>;

}

Question.init({
    questionID: {
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