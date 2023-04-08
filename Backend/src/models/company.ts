import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, IntegerDataType, Model, NonAttribute } from "sequelize";
import sequelize from "src/config/connection";
import User from "./user";

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