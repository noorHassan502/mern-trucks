import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'; // Import CORS package
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

// CORS configuration - Enable CORS for all routes with default settings
app.use(cors());

// If you need more specific CORS configuration, uncomment and configure the block below.
// Ensure only one `app.use(cors())` is active at a time to avoid conflicts.
/*
app.use(cors({
  origin: 'http://example.com', // or an array of allowed origins (e.g., ['http://localhost:5173', 'http://your-frontend-domain.com'])
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
*/

app.use(express.json());

// API route handlers
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

// Error handling middleware
// This middleware catches any errors thrown by previous middleware or route handlers.
app.use((err, req, res, next) => {
  // Determine the status code, defaulting to 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;
  // Determine the error message, defaulting to 'Internal Server Error'
  const message = err.message || 'Internal Server Error';

  // Send a JSON response with the error details
  return res.status(statusCode).json({
    success: false, // Indicate that the request was not successful
    statusCode,      // The HTTP status code of the error
    message,         // A descriptive error message
  });
});

// Start the server and listen for incoming requests on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});
