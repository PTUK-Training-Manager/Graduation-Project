import * as dotenv from 'dotenv'
dotenv.config();

import express from 'express'

const app = express();
const port = 3000;
import db from "./config/connection";
import studentRouter from './routes/student.router';
import trainerRouter from './routes/trainer.router';

app.use(express.json());
app.use("/student", studentRouter);
app.use("/trainer", trainerRouter);


db.sync()
    .then((value) => {
        // console.log(value);
        console.log('All models were synchronized successfully.');
    })
    .catch((error) => {
        console.error('An error occurred while synchronizing models:', error);
    });

app.listen(port, () => {
    console.log(`listening on ${port}`);
    console.log(process.env.NODE_ENV);
})
