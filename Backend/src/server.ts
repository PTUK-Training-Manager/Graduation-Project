import * as dotenv from 'dotenv'
dotenv.config();
import bodyParser from 'body-parser';
import express from 'express'
import cookieParser from 'cookie-parser';
import morgan from "morgan";
const app = express();
import db from "./config/connection";
import association  from './models/associations';
import router from "./routes";
import cors from 'cors';

app.use(cors({
    // origin: '*://localhost:*/*', // The origin of the client (frontend) that we allow to connect to our API
    credentials: true, // This allows the session cookie to be sent back and forth from the client (frontend) to the server (backend)
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('dev')); // Create new morgan logger middleware function

const PORT = process.env.PORT || 5000;

app.use('/api/v1', router);

association()
db.sync({logging: false})
    .then((value) => {
        console.log('All models were synchronized successfully.');
    })
    .catch((error) => {
        console.error('An error occurred while synchronizing models:', error);
    });

app.listen(PORT, () => {
    console.log(`Application server is up and running on PORT ${PORT}`);
})

