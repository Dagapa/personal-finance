import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';

// Routes
import authRoutes from '../../modules/auth/routes/auth.routes';

// Middleware
import { errorHandler } from './middleware/error.middleware';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use(errorHandler);

export default app;