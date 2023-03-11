import {Student} from './student';
import {Answer} from './answer';
import {Answered_Question} from './answered_Question';
import {Company} from './company';
import {Evaluation} from './evaluation';
import {Note} from './note';
import {Permission} from './permission';
import {Question} from './question';
import {Role} from './role';
import {Trainer} from './trainer';
import {Training} from './training';
import {User} from './user';

export const assosi= ()=>{
    User.hasOne(Student,{foreignKey: 'UserName'});
    Student.belongsTo(User,{foreignKey: 'UserName'});
    
    User.hasOne(Company,{foreignKey: 'UserName'});
    Company.belongsTo(User,{foreignKey: 'UserName'});
    
    User.hasOne(Trainer,{foreignKey: 'UserName'});
    Trainer.belongsTo(User,{foreignKey: 'UserName'});

    Role.hasMany(User,{foreignKey: 'RoleId'});
    User.belongsTo(Role,{foreignKey: 'RoleId'});

    Student.hasMany(Training,{foreignKey: 'StudentId'})
    Training.belongsTo(Student,{foreignKey: 'StudentId'})

    Company.hasMany(Training,{foreignKey: 'companyId'})
    Training.belongsTo(Company,{foreignKey: 'companyId'})

    Trainer.hasMany(Training,{foreignKey: 'TrainerId'})
    Training.belongsTo(Trainer,{foreignKey: 'TrainerId'})

    Training.hasMany(Evaluation,{foreignKey: 'TrainingId'})
    Evaluation.belongsTo(Training,{foreignKey: 'TrainingId'})

    Training.hasMany(Answered_Question,{foreignKey: 'TrainingId'})
    Answered_Question.belongsTo(Training,{foreignKey: 'TrainingId'})

    Note.hasOne(Evaluation,{foreignKey: 'NoteId'})
    Evaluation.belongsTo(Note,{foreignKey: 'NoteId'})

    Note.hasOne(Answered_Question,{foreignKey: 'NoteId'})
    Answered_Question.belongsTo(Note,{foreignKey: 'NoteId'})

    Question.hasMany(Answered_Question,{foreignKey: 'QuestionId'})
    Answered_Question.belongsTo(Question,{foreignKey: 'QuestionId'})

    Answer.hasMany(Answered_Question,{foreignKey: 'AnswerId'})
    Answered_Question.belongsTo(Answer,{foreignKey: 'AnswerId'})

    Role.hasMany(Question,{foreignKey: 'RoleId'})
    Question.belongsTo(Role,{foreignKey: 'RoleId'})

    Company.hasMany(Trainer,{foreignKey: 'companyId'})
    Trainer.belongsTo(Company,{foreignKey: 'companyId'})


    Role.belongsToMany(Permission, {
        through:"Role-Permission",
        foreignKey:"RoleId",
        timestamps:false
    })
    Permission.belongsToMany(Role, {
        through:"Role-Permission",
        foreignKey:"PermissionId",
        timestamps:false
    })

}