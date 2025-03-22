import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/userRoutes';

// Load environment variables
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3001;

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Basic health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
}); 