import { CreationOptional, DATEONLY, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from "../config/connection";
import { SemesterType, TrainingStatus, TrainingType } from "../types";
import { SemesterEnum, TrainingTypeEnum } from "../enums";
import { SEMESTER_TYPES, TRAINING_STATUS, TRAINING_TYPE, } from "../constants";
import Student from './Student';
import CompanyBranch from './CompanyBranch';
import Trainer from './Trainer';

export default class Training extends Model<InferAttributes<Training>, InferCreationAttributes<Training>> {
    declare id: CreationOptional<number>;
    declare type: TrainingType;
    declare semester: SemesterType
    declare startDate?: Date;
    declare endDate?: Date;
    declare status: TrainingStatus;
    declare studentId: ForeignKey<Student['id']>;
    declare companyBranchId: ForeignKey<CompanyBranch['id']>;
    declare trainerId?: ForeignKey<Trainer['id']>;
    declare totalItems?: number;

}

Training.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        type: {
            type: DataTypes.ENUM(...TRAINING_TYPE),
            allowNull: false,
            defaultValue: TrainingTypeEnum.first
        },
        semester: {
            type: DataTypes.ENUM(...SEMESTER_TYPES),
            allowNull: true,
        },
        startDate: {
            type: DATEONLY,
            allowNull: true,
        },
        endDate: {
            type: DATEONLY,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM(...TRAINING_STATUS),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Training',
        timestamps: false,
    },
);