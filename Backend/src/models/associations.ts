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
    CompanyBranch
} from "src/models";

const association = () => {

    User.hasOne(Student, {foreignKey: "id"});
    Student.belongsTo(User, {foreignKey: "id"});

    User.hasOne(Company, {foreignKey: "id"});
    Company.belongsTo(User, {foreignKey: "id"});

    User.hasOne(Trainer, {foreignKey: "id"});
    Trainer.belongsTo(User, {foreignKey: "id"});

    Role.hasMany(User, {foreignKey: "roleId"});
    User.belongsTo(Role, {foreignKey: "roleId"});

    Student.hasMany(Training, {foreignKey: "studentId"});
    Training.belongsTo(Student, {foreignKey: "studentId"});

    CompanyBranch.hasMany(Training, {foreignKey: "companyBranchId"});
    Training.belongsTo(CompanyBranch, {foreignKey: "companyBranchId"});

    Trainer.hasMany(Training, {foreignKey: "trainerId"});
    Training.belongsTo(Trainer, {foreignKey: "trainerId"});

    Training.hasMany(Evaluation, {foreignKey: "trainingId"});
    Evaluation.belongsTo(Training, {foreignKey: "trainingId"});

    Training.hasMany(AnsweredQuestion, {foreignKey: "trainingId"});
    AnsweredQuestion.belongsTo(Training, {foreignKey: "trainingId"});

    Note.hasOne(Evaluation, {foreignKey: "noteId"});
    Evaluation.belongsTo(Note, {foreignKey: "noteId"});


    Answer.hasMany(AnsweredQuestion, {foreignKey: "answerID"});
    AnsweredQuestion.belongsTo(Answer, {foreignKey: "answerID"});

    Note.hasOne(AnsweredQuestion, {foreignKey: "noteId"});
    AnsweredQuestion.belongsTo(Note, {foreignKey: "noteId"});
    
    Question.hasMany(AnsweredQuestion, {foreignKey: "questionID"});
    AnsweredQuestion.belongsTo(Question, {foreignKey: "questionID"});


    Role.hasMany(Question, {foreignKey: "roleId"});
    Question.belongsTo(Role, {foreignKey: "roleId"});

    Company.hasMany(Trainer, {foreignKey: "companyId"});
    Trainer.belongsTo(Company, {foreignKey: "companyId"});
    
    CompanyBranch.belongsTo(Company, {foreignKey: "companyId"});
    Company.hasMany(CompanyBranch, {foreignKey: "companyId"});

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

export default association;
