import { Association, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, IntegerDataType, Model } from 'sequelize';
import sequelize from "../config/connection";

export default class Note extends Model<InferAttributes<Note>, InferCreationAttributes<Note>>{
  declare id: CreationOptional<number>;
  declare note: string;
}

Note.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  note: {
    type: DataTypes.JSON,
    allowNull: false
  }
},
  {
    sequelize,
    modelName: 'Note',
    timestamps: false
  });
