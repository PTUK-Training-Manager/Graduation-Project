import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from "../config/connection";
import {
  Answer,
  Note,
  Question,
  Training
} from "../models";


export default class AnsweredQuestion extends Model<InferAttributes<AnsweredQuestion>, InferCreationAttributes<AnsweredQuestion>> {
  declare id: CreationOptional<number>;
  declare trainingId?: ForeignKey<Training['id']>;
  declare noteId?: ForeignKey<Note['id']>;
  declare questionId: ForeignKey<Question['id']>;
  declare answerId: ForeignKey<Answer['id']>;

}

AnsweredQuestion.init({
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