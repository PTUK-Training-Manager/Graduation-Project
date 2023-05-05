import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from "../config/connection";
import User from './User';
import Company from './Company';
import Field from './Field';
import { TrainerStatus } from "../types";
import { TrainerStatusEnum } from "../enums";
import { TRAINER_STATUSES } from "../constants";

export default class Trainer extends Model<InferAttributes<Trainer>, InferCreationAttributes<Trainer>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare fieldId: ForeignKey<Field['id']>;
  declare status: TrainerStatus;
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
  status: {
    type: DataTypes.ENUM(...TRAINER_STATUSES),
    defaultValue: TrainerStatusEnum.active,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Trainer',
  timestamps: false
});