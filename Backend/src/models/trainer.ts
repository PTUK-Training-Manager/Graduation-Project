import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from "src/config/connection";
import User from './User';
import Company from './Company';

export default class Trainer extends Model<InferAttributes<Trainer>, InferCreationAttributes<Trainer>> {
  declare id: number;
  declare name: string;
  declare field: string;
  declare userId: ForeignKey<User['id']>;
  declare companyId?: ForeignKey<Company['id']>;
}

Trainer.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
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