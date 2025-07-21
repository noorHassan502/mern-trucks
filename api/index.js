import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';

dotenv.config();

// ✅ Corrected promise syntax
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const app = express();

// Example middleware for parsing JSON
app.use(express.json());

// Example routers
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});
