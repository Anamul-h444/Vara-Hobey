import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('🚀 Vara Hobe API Server Running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`⚡ Server running on http://localhost:${PORT}`);
});