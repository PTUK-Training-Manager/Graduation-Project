import {
    Student,
    Answer,
    AnsweredQuestion,
    Company,
    Evaluation,
    Note,
    Permission,
    Question,
    Role,
    Trainer,
    Training,
    User
} from "src/models";

const association = () => {
    User.hasOne(Student, {foreignKey: "userName"});
    Student.belongsTo(User, {foreignKey: "userName"});

    User.hasOne(Company, {foreignKey: "userName"});
    Company.belongsTo(User, {foreignKey: "userName"});

    User.hasOne(Trainer, {foreignKey: "userName"});
    Trainer.belongsTo(User, {foreignKey: "userName"});

    Role.hasMany(User, {foreignKey: "roleId"});
    User.belongsTo(Role, {foreignKey: "roleId"});

    Student.hasMany(Training, {foreignKey: "studentId"});
    Training.belongsTo(Student, {foreignKey: "studentId"});

    Company.hasMany(Training, {foreignKey: "companyId"});
    Training.belongsTo(Company, {foreignKey: "companyId"});

    Trainer.hasMany(Training, {foreignKey: "trainerId"});
    Training.belongsTo(Trainer, {foreignKey: "trainerId"});

    Training.hasMany(Evaluation, {foreignKey: "trainingId"});
    Evaluation.belongsTo(Training, {foreignKey: "trainingId"});

    Training.hasMany(AnsweredQuestion, {foreignKey: "trainingId"});
    AnsweredQuestion.belongsTo(Training, {foreignKey: "trainingId"});

    Note.hasOne(Evaluation, {foreignKey: "noteId"});
    Evaluation.belongsTo(Note, {foreignKey: "noteId"});

    Note.hasOne(AnsweredQuestion, {foreignKey: "noteId"});
    AnsweredQuestion.belongsTo(Note, {foreignKey: "noteId"});

    Question.hasMany(AnsweredQuestion, {foreignKey: "questionId"});
    AnsweredQuestion.belongsTo(Question, {foreignKey: "questionId"});

    Answer.hasMany(AnsweredQuestion, {foreignKey: "answerId"});
    AnsweredQuestion.belongsTo(Answer, {foreignKey: "answerId"});

    Role.hasMany(Question, {foreignKey: "roleId"});
    Question.belongsTo(Role, {foreignKey: "roleId"});

    Company.hasMany(Trainer, {foreignKey: "companyId"});
    Trainer.belongsTo(Company, {foreignKey: "companyId"});

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
