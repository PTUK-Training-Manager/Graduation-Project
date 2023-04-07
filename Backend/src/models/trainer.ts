import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, IntegerDataType, Model, NonAttribute } from 'sequelize';
import sequelize from "src/config/connection";
import User from './user';
import Company from './company';

export default class Trainer extends Model<InferAttributes<Trainer>, InferCreationAttributes<Trainer>> {
  declare trainerId: number;
  declare trainerName: string;
  declare field: string;
  declare userId: ForeignKey<User['id']>;
  declare companyId?: ForeignKey<Company['companyId']>;
}

Trainer.init({
  trainerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  trainerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  field: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Trainer',
  timestamps: false
});