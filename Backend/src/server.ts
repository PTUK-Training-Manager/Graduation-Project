import dotenv from 'dotenv'
dotenv.config();
import app from "./middlewares/index";
import db from "./config/connection";
import associations from './models/Associations';
const PORT = process.env.PORT || 5000;

associations();
db.sync({ logging: false, alter: false })
    .then((value) => {
        console.log('All models were synchronized successfully.');
    })
    .catch((error) => {
        console.error('An error occurred while synchronizing models:', error);
    });

app.listen(PORT, () => {
    console.log(`Application server is up and running on PORT ${PORT}`);
})
