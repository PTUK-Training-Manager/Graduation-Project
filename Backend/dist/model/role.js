"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../config/connection"));
class Role extends sequelize_1.Model {
}
exports.Role = Role;
var userRoleEnum;
(function (userRoleEnum) {
    userRoleEnum["superAdmin"] = "superAdmin";
    userRoleEnum["universityTrainingOfficer"] = "universityTrainingOfficer";
    userRoleEnum["Trainer"] = "Trainer";
    userRoleEnum["student"] = "student";
    userRoleEnum["AdministrationRegistration"] = "Administration&Registration";
})(userRoleEnum || (userRoleEnum = {}));
Role.init({
    roleID: {
        type: sequelize_1.DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    userRole: {
        type: sequelize_1.DataTypes.ENUM(userRoleEnum.AdministrationRegistration, userRoleEnum.Trainer, userRoleEnum.student, userRoleEnum.superAdmin, userRoleEnum.universityTrainingOfficer),
        //type: DataTypes.STRING,  
        allowNull: false
    }
}, {
    sequelize: connection_1.default,
    modelName: 'Role',
    timestamps: false
});
