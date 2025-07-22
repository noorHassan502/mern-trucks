import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utills/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, email, password, cnic } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword, cnic }); 
  try {
    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
};


export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check for required fields
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Compare password
    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    // Optional: Create JWT token
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1d' });

    console.log('User signed in:', user); // ✅ Logs in terminal

    // ✅ Send response to client (Insomnia)
    res
    .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // true in production only
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
  
    
    .status(200).json({
      success: true,
      message: 'Signed in successfully!',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        cnic: user.cnic,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
     
    });
  } catch (err) {
    console.error('Signin Error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};