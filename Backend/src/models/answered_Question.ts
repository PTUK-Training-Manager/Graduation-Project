import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, IntegerDataType, Model, NonAttribute } from 'sequelize';
import sequelize from "src/config/connection";
import {
  Answer,
  Note,
  Question,
  Training
} from "src/models";


// interface answered_QuestionAttributes {
//   answered_QuestionID:IntegerDataType
// }

export default class Answered_Question extends Model<InferAttributes<Answered_Question>, InferCreationAttributes<Answered_Question>> {
  declare id: CreationOptional<number>;
  declare trainingId?: ForeignKey<Training['trainingId']>;
  declare noteId?:ForeignKey<Note['noteId']>;
  declare questionId?:ForeignKey<Question['questionId']>;
  declare answerId?:ForeignKey<Answer['answerId']>;

}

Answered_Question.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }},
    {
    sequelize,
    modelName: 'Answered_Question',
    timestamps:false  
    });