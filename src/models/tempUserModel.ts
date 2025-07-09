import mongoose from "mongoose";



const tempUserSchema = new mongoose.Schema({
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
  verificationCode: {
    type: String,
    required: true
  },
  codeExpiry: {
    type: Date,
    required: true
  }
});


const TempUser = mongoose.models.tempusers || mongoose.model("tempusers", tempUserSchema);

export default TempUser;