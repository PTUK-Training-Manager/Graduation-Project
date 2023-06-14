import app from "./middlewares";
import db from "./config/connection";
import associations from './models/Associations';
import {isProduction} from "./utils";

const PORT = process.env.PORT || 5000;

associations();

db.sync({logging: false, alter: false})
    .then((value) => {
        console.log('All models were synchronized successfully.');
    })
    .catch((error) => {
        console.error('An error occurred while synchronizing models:', error);
    });

app.listen(PORT, () => {
    if (!isProduction) {
        console.log(`Application server is up and running on PORT ${PORT}`);
    }
    console.log(`API URL: ${process.env.API_URL}`);
    console.log(`React App URL: ${process.env.REACT_APP_URL}`);
});
