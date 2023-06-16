import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    ForeignKey,
    CreationOptional,
    HasOneGetAssociationMixin
} from 'sequelize';
import sequelize from '../config/connection';
import Role from "./Role";

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare username: string;
    declare email: string;
    declare password: string;
    declare roleId: ForeignKey<Role['id']>;
    declare getRole: HasOneGetAssociationMixin<Role>;
    declare name: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "username"
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'User',
    timestamps: false
});