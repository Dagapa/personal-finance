import cors from 'cors';
import express from 'express';
import routes from './routes';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Usar handler de rutas en prefijo /api
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export default app;
