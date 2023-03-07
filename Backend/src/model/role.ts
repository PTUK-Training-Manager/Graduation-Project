import { DataTypes, Model } from 'sequelize';
import db from '../config/connection';
import { EnumType } from 'typescript';


interface PermissionAttributes {
  ID:number,
  permission:string
}


interface RoleAttributes {
  roleID:number,
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
      type: DataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true
    },
    userRole: {
    type: DataTypes.ENUM(userRoleEnum.AdministrationRegistration,userRoleEnum.Trainer,userRoleEnum.student,userRoleEnum.superAdmin,userRoleEnum.universityTrainingOfficer),
    //type: DataTypes.STRING,  
    allowNull: false
    }},
    {
    sequelize: db,
    modelName: 'Role',
    timestamps:false  
    });