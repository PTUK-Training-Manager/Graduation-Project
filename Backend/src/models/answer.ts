import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, IntegerDataType, Model } from 'sequelize';
import sequelize from "src/config/connection";

export default class Answer extends Model<InferAttributes<Answer>, InferCreationAttributes<Answer>> {
  declare answerId: CreationOptional<number>;
  declare answer: string;
}

Answer.init({
  answerId: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
  {
    sequelize,
    modelName: 'Answer',
    timestamps: false
  });