import { DataTypes, IntegerDataType, Model } from "sequelize";
import db from "../config/connection";

interface CompanyAttributes {
  companyId: IntegerDataType;
  companyName: string;
  phoneNumber: string;
  location: string;
  managerName: string;
}

export class Company extends Model<CompanyAttributes> { }

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
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    managerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "Company",
    timestamps: false,
  }
);
