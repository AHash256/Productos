import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/products.routes.js';
import { notFound } from './middlewares/notFound.middleware.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/api/products', productRoutes);

app.use(notFound);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
