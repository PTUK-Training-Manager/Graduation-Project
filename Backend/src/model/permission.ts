import { DataTypes, InferAttributes, InferCreationAttributes, IntegerDataType, Model } from 'sequelize';
import db from '../config/connection';

// interface PermissionAttributes {
//   id:IntegerDataType,
//   permission:string
// }

export class Permission extends Model<InferAttributes<Permission>, InferCreationAttributes<Permission>> {
 declare id: number;
declare permission:string;
}

Permission.init({
  id: {
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