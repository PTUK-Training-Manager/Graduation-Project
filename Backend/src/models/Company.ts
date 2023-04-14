import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/connection";
import User from "./User";

export default class Company extends Model<InferAttributes<Company>, InferCreationAttributes<Company>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare phoneNumber: string;
    declare managerName: string;
    declare userId: ForeignKey<User['id']>;
}

Company.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        managerName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Company",
        timestamps: false,
    }
);