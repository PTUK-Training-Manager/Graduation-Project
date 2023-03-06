"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trainer = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../config/connection"));
class Trainer extends sequelize_1.Model {
}
exports.Trainer = Trainer;
Trainer.init({
    trainerId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    trainerName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    field: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: connection_1.default,
    modelName: 'Trainer',
    timestamps: false
});
