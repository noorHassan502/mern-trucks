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

export const google= async (req,res, next)=>{
  try{
    const user= await User.findOne({ email: req.body.email});
    debugger;
    if (user){
      const token= jwt.sign({id:user._id},process.env.JWT_SECRET);
      const {password: pass, ...rest} = user._doc;
      res.cookie('access_token', token, { httpOnly: true })
       .status(200)
      .json(rest);
    } else{
      const generatedPassword= Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
       const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
          username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
        })
           await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
             res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
       
  } catch(error)  {   
      next(error)
  }
  
}

export const signUpUserOrUpdateUser = async(req, res) => {
  const {email, username, avatar} = req.body;
  try{
    const user= await User.findOne({ email });
    if(!user)
    {
      const newUser = new User({username, email, avatar});
      await newUser.save();
      res.status(200).json({message:"User created successfully"});
    }
    else
    {
      user.avatar = avatar;
      user.username = username;
      
      await User.updateOne({ $set: { user } });
      res.status(200).json({message:"User updated successfully"});
    }
  }
  catch(exception)
  {
    console.log("Exception occurred while updating/creating user", exception);
    res.status(500).json({error:`Error occurred ${exception}`});
  }
}