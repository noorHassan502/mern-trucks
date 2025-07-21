import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';

dotenv.config();


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const app = express();


app.use(express.json());

// Example routers
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use((err,req, res,next)=> {
  const statusCode = err.statusCode|| 500;
  const message= err.message || 'Internal Server Error';
  return res.status(statusCode) .json({
    success:false,
    statusCode,
    message,
  })
})


app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});
