import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, IntegerDataType, Model, NonAttribute } from 'sequelize';
import sequelize from "src/config/connection";
import User from './user';
import Company from './company';

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