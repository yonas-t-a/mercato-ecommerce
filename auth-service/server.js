import express from 'express';
import dotenv from 'dotenv';
import sequelize from './src/config/db.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

async function startApp() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync(); // <-- Add this line
        console.log('Database synchronized.');
    } catch (error) {
        console.error('Unable to connect to the database:', error); 
    }
}
startApp();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});