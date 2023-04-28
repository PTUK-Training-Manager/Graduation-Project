import cors from 'cors';
import chalk from "chalk";
import app from '../app';

/**
 * What is CORS?
 * CORS stands for Cross-Origin Resource Sharing. It is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin.
 */

app.use(cors({
    // origin: 'http://localhost:3000', // The origin of the client (frontend) that we allow to connect to our API
    origin: (origin, callback) => {
        const msg = `Request Origin: ${origin}`;
        console.log(chalk.blue(msg));
        callback(null, true);
    },
    credentials: true, // This allows the session cookie to be sent back and forth from the client (frontend) to the server (backend)
}));