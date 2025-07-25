import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cnic: {
    type: String,
    required: false,
    unique: true,
    match: [/^\d{13}$/, 'CNIC must be a 13-digit number'],
  },
  avatar: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
