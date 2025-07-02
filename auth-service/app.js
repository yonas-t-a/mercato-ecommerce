import express from 'express';
import authRoutes from './src/routes/auth.routes.js';
import errorMiddleware from './src/middlewares/error.middleware.js';
import cors from 'cors';


const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(errorMiddleware);

export default app;