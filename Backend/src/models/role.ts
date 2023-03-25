import { DataTypes, InferAttributes, InferCreationAttributes, IntegerDataType, Model } from 'sequelize';
import { EnumType } from 'typescript';
import db from '../config/connection';


// interface RoleAttributes {
//   roleID:IntegerDataType,
//   userRole:EnumType
// }

enum userRoleEnum {
  superAdmin='superAdmin',
  universityTrainingOfficer='universityTrainingOfficer' ,
  Trainer ='trainer',
  student='student',
  AdministrationRegistration='administrationRegistration',
}
export default class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  declare roleID: number;
  declare userRole: typeof userRoleEnum; 
}


Role.init({
  roleID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userRole: {
 type: DataTypes.ENUM(userRoleEnum.superAdmin, userRoleEnum.universityTrainingOfficer, userRoleEnum.Trainer, userRoleEnum.student, userRoleEnum.AdministrationRegistration),
    allowNull: false
  }
},
  {
    sequelize: db,
    modelName: 'Role',
    timestamps: false
  });