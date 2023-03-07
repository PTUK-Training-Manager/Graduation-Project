import { DataTypes, Model } from 'sequelize';
import db from '../config/connection';

interface TrainerAttributes {
  trainerId:string,
  trainerName:string,
  field:string
}

export class Trainer extends Model<TrainerAttributes> {}

Trainer.init({
  trainerId: {
      type: DataTypes.STRING,
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