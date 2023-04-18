import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from "../config/connection";
import User from './User';
import Company from './Company';

export default class Trainer extends Model<InferAttributes<Trainer>, InferCreationAttributes<Trainer>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare field: string;
  declare userId: ForeignKey<User['id']>;
  declare companyId?: ForeignKey<Company['id']>;
}

Trainer.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
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