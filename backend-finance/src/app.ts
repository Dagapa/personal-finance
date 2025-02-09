import app from './infrastructure/http/server';
import { config } from './config/env';

const startServer = () => {
  app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
  });
};

startServer();