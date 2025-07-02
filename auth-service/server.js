import dotenv from 'dotenv';
import sequelize from './src/config/db.js';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startApp() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({ alter: true });
        console.log('Database synchronized.');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}
startApp();