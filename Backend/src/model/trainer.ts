import { DataTypes, IntegerDataType, Model } from 'sequelize';
import db from '../config/connection';

interface TrainerAttributes {
  trainerId:IntegerDataType,
  trainerName:string,
  field:string
}

export class Trainer extends Model<TrainerAttributes> {}

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
      sequelize: db,
      modelName: 'Trainer',
      timestamps:false 
    });