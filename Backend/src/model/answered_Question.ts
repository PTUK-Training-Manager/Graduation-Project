import { DataTypes, InferAttributes, InferCreationAttributes, IntegerDataType, Model, NonAttribute } from 'sequelize';
import db from '../config/connection';


// interface answered_QuestionAttributes {
//   answered_QuestionID:IntegerDataType
// }

export class Answered_Question extends Model<InferAttributes<Answered_Question>, InferCreationAttributes<Answered_Question>> {
  declare answered_QuestionID: number;
  declare trainingId?:NonAttribute<number>;
  declare noteId?:NonAttribute<number>;
  declare questionId?:NonAttribute<number>;
  declare answerId?:NonAttribute<number>;

}

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