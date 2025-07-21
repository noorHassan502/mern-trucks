import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utills/error.js';

export const signup = async (req, res, next) => {
  const { username, email, password, cnic } = req.body;

  // Hash the password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // Create a new user instance
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    cnic,
  });

  try {
    await newUser.save();

    // Log to terminal
    console.log('✅ User created successfully!');

    // Send response to client
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    console.error('❌ Error creating user:', error.message);
    res.status(500).json({ error: error.message });
  }
};
