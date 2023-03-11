import { DataTypes, IntegerDataType, Model } from 'sequelize';
import db from '../config/connection';
import { EnumType } from 'typescript';


interface RoleAttributes {
  roleID:IntegerDataType,
  userRole:EnumType
}

export class Role extends Model<RoleAttributes> {}
enum userRoleEnum {
  superAdmin = 'superAdmin',
  universityTrainingOfficer = 'universityTrainingOfficer',
  Trainer = 'Trainer',
  student = 'student',
  AdministrationRegistration = 'Administration&Registration',
}

Role.init({
  roleID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userRole: {
    type: DataTypes.ENUM(userRoleEnum.AdministrationRegistration,userRoleEnum.Trainer,userRoleEnum.student,userRoleEnum.superAdmin,userRoleEnum.universityTrainingOfficer), 
    allowNull: false
    }},
    {
    sequelize: db,
    modelName: 'Role',
    timestamps:false  
    });