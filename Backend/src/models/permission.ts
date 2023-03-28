import { DataTypes, InferAttributes, InferCreationAttributes, IntegerDataType, Model } from 'sequelize';
import sequelize from "src/config/connection";

// interface PermissionAttributes {
//   id:IntegerDataType,
//   permission:string
// }

export default class Permission extends Model<InferAttributes<Permission>, InferCreationAttributes<Permission>> {
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
      sequelize,
      modelName: 'Permission',
      timestamps:false 
    });