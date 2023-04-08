import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, IntegerDataType, Model, NonAttribute } from 'sequelize';
import sequelize from "src/config/connection";
import {
  Answer,
  Note,
  Question,
  Training
} from "src/models";


export default class Answered_Question extends Model<InferAttributes<Answered_Question>, InferCreationAttributes<Answered_Question>> {
  declare id: CreationOptional<number>;
  declare trainingId?: ForeignKey<Training['id']>;
  declare noteId?: ForeignKey<Note['id']>;
  declare questionId: ForeignKey<Question['id']>;
  declare answerId: ForeignKey<Answer['id']>;

}

Answered_Question.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
},
  {
    sequelize,
    modelName: 'Answered_Question',
    timestamps: false
  });