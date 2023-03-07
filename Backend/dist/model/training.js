"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Training = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../config/connection"));
class Training extends sequelize_1.Model {
}
exports.Training = Training;
var TrainingType;
(function (TrainingType) {
    TrainingType["first"] = "first";
    TrainingType["second"] = "second";
    TrainingType["compound"] = "compound";
})(TrainingType || (TrainingType = {}));
var TrainingStatus;
(function (TrainingStatus) {
    TrainingStatus["pending"] = "pending";
    TrainingStatus["rejected"] = "rejected";
    TrainingStatus["running"] = "running";
    TrainingStatus["canceled"] = "canceled";
    TrainingStatus["submitted"] = "submitted";
    TrainingStatus["completed"] = "completed";
})(TrainingStatus || (TrainingStatus = {}));
Training.init({
    trainingId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: sequelize_1.DataTypes.ENUM(TrainingType.first, TrainingType.second, TrainingType.compound),
        allowNull: false
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: sequelize_1.DataTypes.ENUM(TrainingStatus.canceled, TrainingStatus.completed, TrainingStatus.pending, TrainingStatus.rejected, TrainingStatus.running, TrainingStatus.submitted),
        allowNull: false
    }
}, {
    sequelize: connection_1.default,
    modelName: 'Training',
    timestamps: false
});
