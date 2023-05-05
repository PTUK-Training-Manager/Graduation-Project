import {
    Student,
    AnsweredQuestion,
    Answer,
    Company,
    Evaluation,
    Note,
    Permission,
    Question,
    Role,
    Trainer,
    Training,
    User,
    CompanyBranch,
    CompanyField,
    Field
} from "./index";

const associations = () => {

    User.hasOne(Student, { foreignKey: "userId" });
    Student.belongsTo(User, { foreignKey: "userId" });

    User.hasOne(Company, { foreignKey: "userId" });
    Company.belongsTo(User, { foreignKey: "userId" });

    User.hasOne(Trainer, { foreignKey: "userId" });
    Trainer.belongsTo(User, { foreignKey: "userId" });

    Role.hasMany(User, { foreignKey: "roleId" });
    User.belongsTo(Role, { foreignKey: "roleId" });

    Student.hasMany(Training, { foreignKey: "studentId" });
    Training.belongsTo(Student, { foreignKey: "studentId" });

    CompanyBranch.hasMany(Training, { foreignKey: "companyBranchId" });
    Training.belongsTo(CompanyBranch, { foreignKey: "companyBranchId" });

    Trainer.hasMany(Training, { foreignKey: "trainerId" });
    Training.belongsTo(Trainer, { foreignKey: "trainerId" });

    Training.hasMany(Evaluation, { foreignKey: "trainingId" });
    Evaluation.belongsTo(Training, { foreignKey: "trainingId" });

    Training.hasMany(AnsweredQuestion, { foreignKey: "trainingId" });
    AnsweredQuestion.belongsTo(Training, { foreignKey: "trainingId" });

    Note.hasOne(Evaluation, { foreignKey: "noteId" });
    Evaluation.belongsTo(Note, { foreignKey: "noteId" });

    Answer.hasMany(AnsweredQuestion, { foreignKey: "answerId" });
    AnsweredQuestion.belongsTo(Answer, { foreignKey: "answerId" });

    Note.hasOne(AnsweredQuestion, { foreignKey: "noteId" });
    AnsweredQuestion.belongsTo(Note, { foreignKey: "noteId" });

    Question.hasMany(AnsweredQuestion, { foreignKey: "questionId" });
    AnsweredQuestion.belongsTo(Question, { foreignKey: "questionId" });


    Role.hasMany(Question, { foreignKey: "roleId" });
    Question.belongsTo(Role, { foreignKey: "roleId" });

    Company.hasMany(Trainer, { foreignKey: "companyId" });
    Trainer.belongsTo(Company, { foreignKey: "companyId" });

    CompanyBranch.belongsTo(Company, { foreignKey: "companyId" });
    Company.hasMany(CompanyBranch, { foreignKey: "companyId" });

    CompanyField.belongsTo(Company, { foreignKey: "companyId" });
    Company.hasMany(CompanyField, { foreignKey: "companyId" });

    CompanyField.belongsTo(Field, { foreignKey: "fieldId" });
    Field.hasMany(CompanyField, { foreignKey: "fieldId" });

    Trainer.belongsTo(Field, { foreignKey: "fieldId" });
    Field.hasMany(Trainer, { foreignKey: "fieldId" });


    Role.belongsToMany(Permission, {
        through: "Role-Permission",
        foreignKey: "RoleId",
        timestamps: false,
    });
    Permission.belongsToMany(Role, {
        through: "Role-Permission",
        foreignKey: "PermissionId",
        timestamps: false,
    });
};

export default associations;