import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from "src/config/connection";
import {
  Note,
  Training
} from "src/models";

export default class Evaluation extends Model<InferAttributes<Evaluation>, InferCreationAttributes<Evaluation>>{
  declare id: CreationOptional<number>;
  declare startTime: Date;
  declare endTime: Date;
  declare signed: boolean;
  declare skills: string;
  declare trainingId: ForeignKey<Training['id']>;
  declare noteId?: ForeignKey<Note['id']>;

}

Evaluation.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  signed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  skills: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
  {
    sequelize,
    modelName: 'Evaluation',
    timestamps: false
  });