import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from "../config/connection";

export default class Answer extends Model<InferAttributes<Answer>, InferCreationAttributes<Answer>> {
  declare id: CreationOptional<number>;
  declare answer: string;
}

Answer.init({
  id: {
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