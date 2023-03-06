import express from 'express'
const app = express()
const port = 3000
import db from "./config/connection";
import {Student} from './model/student'
import {Company} from './model/company'
import {Evaluation} from './model/evaluation'
import {Permission} from './model/permission'
import {Role} from './model/role'
import {Trainer} from './model/trainer'
import {Training} from './model/training'
import {User} from './model/user'
import studentRouter from './routes/student.router'

app.use(express.json());
app.use("/student", studentRouter);

db.sync() 
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch((error) => {
    console.error('An error occurred while synchronizing models:', error);
  });

  app.listen(port,() => console.log(`listening on ${port}`))

