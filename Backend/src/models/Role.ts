import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, IntegerDataType, Model } from 'sequelize';
import sequelize from "../config/connection";
import { UserRole } from "../types";
import { UserRoleDisplayName } from "../enums";
import { USER_ROLES } from "../constants";

export default class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
    declare id: CreationOptional<number>;
    declare role: UserRole;
}

Role.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role: {
        type: DataTypes.ENUM(...USER_ROLES),
        defaultValue: UserRoleDisplayName.SUPER_ADMIN,
        allowNull: false,
    }
},
    {
        sequelize,
        modelName: 'Role',
        timestamps: false
    });