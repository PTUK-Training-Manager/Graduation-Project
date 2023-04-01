import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, IntegerDataType, Model} from 'sequelize';
import sequelize from "src/config/connection";
import {UserRole} from "src/types";
import {UserRoleEnum} from "src/enums";
import {USER_ROLES} from "src/constants";

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
            defaultValue: UserRoleEnum.SUPER_ADMIN,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'Role',
        timestamps: false
    });