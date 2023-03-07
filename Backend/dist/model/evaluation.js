"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Evaluation = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../config/connection"));
class Evaluation extends sequelize_1.Model {
}
exports.Evaluation = Evaluation;
Evaluation.init({
    Id: {
        type: sequelize_1.DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    startTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    endTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    signed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    skills: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: connection_1.default,
    modelName: 'Evaluation',
    timestamps: false
});
