import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';

import transactionRoutes from './routes/transactions';

dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.PORT || '3000', 10);

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/transactions', transactionRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});