import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, IntegerDataType, Model, NonAttribute } from 'sequelize';
import sequelize from "src/config/connection";
import answer from './answer';
import question from './question';


// interface answered_QuestionAttributes {
//   answered_QuestionID:IntegerDataType
// }

export default class Answered_Question extends Model<InferAttributes<Answered_Question>, InferCreationAttributes<Answered_Question>> {
  declare answered_QuestionID: number;
  declare trainingId?:NonAttribute<number>;
  declare noteId?:NonAttribute<number>;
  declare questionId: ForeignKey<question['questionID']>;
  // declare questionId?:NonAttribute<number>;
  // declare answerID?:NonAttribute<number>;
  declare answerID: ForeignKey<answer['answerID']>;

}

Answered_Question.init({
    answered_QuestionID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }},
    {
    sequelize,
    modelName: 'Answered_Question',
    timestamps:false  
    });