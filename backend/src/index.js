import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import movieRoutes from './routes/movies.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Explicitly point to backend root .env (fixes ES module path issues)
dotenv.config({ path: join(__dirname, '../.env') });

// Debug: confirm keys are loaded
console.log('OMDB KEY loaded:', process.env.OMDB_API_KEY ? '✅ YES' : '❌ MISSING');
console.log('ANTHROPIC KEY loaded:', process.env.ANTHROPIC_API_KEY ? '✅ YES' : '❌ MISSING');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api', limiter);

app.use('/api/movies', movieRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
