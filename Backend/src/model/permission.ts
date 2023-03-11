import { DataTypes, IntegerDataType, Model } from 'sequelize';
import db from '../config/connection';

interface PermissionAttributes {
  ID:IntegerDataType,
  permission:string
}

export class Permission extends Model<PermissionAttributes> {}

Permission.init({
  ID: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        permission: {
          type: DataTypes.STRING,
          allowNull: false,
        },
    }, {
      sequelize: db,
      modelName: 'Permission',
      timestamps:false 
    });