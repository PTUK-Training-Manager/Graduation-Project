import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, IntegerDataType, Model, NonAttribute } from "sequelize";
import sequelize from "src/config/connection";
import User from "./user";

// interface CompanyAttributes {
//   companyId: IntegerDataType;
//   companyName: string;
//   phoneNumber: string;
//   location: string;
//   managerName: string;
// }

export default class Company extends Model<InferAttributes<Company>, InferCreationAttributes<Company>> {
 declare companyId:CreationOptional<number>;
 declare companyName: string;
 declare phoneNumber: string;
 declare managerName: string;
 declare userId: ForeignKey<User['id']>;
 }

Company.init(
  {
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    companyName: {
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