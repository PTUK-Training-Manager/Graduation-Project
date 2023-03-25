import { DataTypes, InferAttributes, InferCreationAttributes, IntegerDataType, Model, NonAttribute } from 'sequelize';
import db from '../config/connection';

// interface TrainerAttributes {
//   trainerId:IntegerDataType,
//   trainerName:string,
//   field:string
// }

export default class Trainer extends Model<InferAttributes<Trainer>, InferCreationAttributes<Trainer>> {
  declare trainerId: number;
 declare trainerName: string;
 declare field: string;
 declare userName?:NonAttribute<string>;
 declare companyId?:NonAttribute<number>;


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
      sequelize: db,
      modelName: 'Trainer',
      timestamps:false 
    });