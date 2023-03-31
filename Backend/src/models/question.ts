import { DataTypes, InferAttributes, InferCreationAttributes, IntegerDataType, Model, NonAttribute } from 'sequelize';
import sequelize from "src/config/connection";


// interface QuestionAttributes {
//   questionID:IntegerDataType,
//   question:string,
//   isMultipleChoice:boolean
// }

export default class Question extends Model<InferAttributes<Question>, InferCreationAttributes<Question>> {
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
    sequelize,
    modelName: 'Question',
    timestamps:false  
    });