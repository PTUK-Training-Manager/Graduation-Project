import { Student } from "./student";
import { Answer } from "./answer";
import { Answered_Question } from "./answered_Question";
import { Company } from "./company";
import { Evaluation } from "./evaluation";
import { Note } from "./note";
import { Permission } from "./permission";
import { Question } from "./question";
import { Role } from "./role";
import { Trainer } from "./trainer";
import { Training } from "./training";
import { User } from "./user";

 const association = () => {
  User.hasOne(Student, { foreignKey: "userName" });
  Student.belongsTo(User, { foreignKey: "userName" });

  User.hasOne(Company, { foreignKey: "userName" });
  Company.belongsTo(User, { foreignKey: "userName" });

  User.hasOne(Trainer, { foreignKey: "userName" });
  Trainer.belongsTo(User, { foreignKey: "userName" });

  Role.hasMany(User, { foreignKey: "roleId" });
  User.belongsTo(Role, { foreignKey: "roleId" });

  Student.hasMany(Training, { foreignKey: "studentId" });
  Training.belongsTo(Student, { foreignKey: "studentId" });

  Company.hasMany(Training, { foreignKey: "companyId" });
  Training.belongsTo(Company, { foreignKey: "companyId" });

  Trainer.hasMany(Training, { foreignKey: "trainerId" });
  Training.belongsTo(Trainer, { foreignKey: "trainerId" });

  Training.hasMany(Evaluation, { foreignKey: "trainingId" });
  Evaluation.belongsTo(Training, { foreignKey: "trainingId" });

  Training.hasMany(Answered_Question, { foreignKey: "trainingId" });
  Answered_Question.belongsTo(Training, { foreignKey: "trainingId" });

  Note.hasOne(Evaluation, { foreignKey: "noteId" });
  Evaluation.belongsTo(Note, { foreignKey: "noteId" });

  Note.hasOne(Answered_Question, { foreignKey: "noteId" });
  Answered_Question.belongsTo(Note, { foreignKey: "noteId" });

  Question.hasMany(Answered_Question, { foreignKey: "questionId" });
  Answered_Question.belongsTo(Question, { foreignKey: "questionId" });

  Answer.hasMany(Answered_Question, { foreignKey: "answerId" });
  Answered_Question.belongsTo(Answer, { foreignKey: "answerId" });

  Role.hasMany(Question, { foreignKey: "roleId" });
  Question.belongsTo(Role, { foreignKey: "roleId" });

  Company.hasMany(Trainer, { foreignKey: "companyId" });
  Trainer.belongsTo(Company, { foreignKey: "companyId" });

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
