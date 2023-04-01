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
import Role from "@models/role";


export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {

    // declare id: number;
    // id can be undefined during creation when using `autoIncrement`
    declare id: CreationOptional<number>;
    declare username: string;
    declare email: string;
    declare password: string;
    // declare roleId?: number;
    // foreign keys are automatically added by associations methods (like Project.belongsTo)
    // by branding them using the `ForeignKey` type, `Project.init` will know it does not need to
    // display an error if ownerId is missing.
    declare roleId: ForeignKey<Role['id']>;

    declare getRole: HasOneGetAssociationMixin<Role>
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
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User',
    timestamps: false
});