import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  passwordResetToken: {
    type: String,
    default: null
  },
  passwordResetExpiry: {
    type: Date,
    default: null
  },
  refreshToken: {
    type: String,
    default: null
  }
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;