import { DataTypes, InferAttributes, InferCreationAttributes, IntegerDataType, Model } from 'sequelize';
import db from '../config/connection';
import { EnumType } from 'typescript';


// interface RoleAttributes {
//   roleID:IntegerDataType,
//   userRole:EnumType
// }

enum userRoleEnum {
  superAdmin ,
  universityTrainingOfficer ,
  Trainer ,
  student,
  AdministrationRegistration,
}
export class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  declare roleID: IntegerDataType;
  declare userRole: EnumType;
}


Role.init({
  roleID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userRole: {
    type:typeof userRoleEnum,
    allowNull: false
  }
},
  {
    sequelize: db,
    modelName: 'Role',
    timestamps: false
  });