import express from 'express';
import cors from 'cors';
import { productsRouter } from './routes/products';
import { cartRouter } from './routes/cart';
import { authRouter } from './routes/auth';
import { reviewsRouter } from './routes/reviews';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// API routes
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/auth', authRouter);
app.use('/api/reviews', reviewsRouter);

export default app;
