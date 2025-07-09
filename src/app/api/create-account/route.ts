import { connectDb } from "@/lib/db";
import TempUser from "@/models/tempUserModel";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { sendVerificationEmail } from "@/lib/mailer";



await connectDb();


export async function POST(request: NextRequest){
  try {
    const reqBody = await request.json();
    const {email, username, password} = await reqBody;


    // Check if user already exists
    const existedUser = await User.findOne({email: email.toLowerCase()});

    if(existedUser){
      return NextResponse.json({error: "User already exists!"}, {status: 400});
    }


    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    // verification code
    const verificationCode = Math.floor(100000 +  Math.random() * 900000).toString();
    const codeExpiry = new Date(Date.now() + parseInt(process.env.CODE_EXPIRY_MINUTES! || "10") * 60 * 1000);


    // create new user
    const existingTempUser = await TempUser.findOne({email: email.toLowerCase()});

    if(existingTempUser){

      existingTempUser.username = username;
      existingTempUser.email = email;
      existingTempUser.password = hashedPassword;
      existingTempUser.verificationCode = verificationCode;
      existingTempUser.codeExpiry = codeExpiry;
      
      const savedUser = await existingTempUser.save();
      console.log(savedUser);

    } else {
      const tempUser = new TempUser({
        username,
        email : email.toLowerCase(),
        password: hashedPassword,
        verificationCode,
        codeExpiry
      });

      const savedUser = await tempUser.save();
      console.log(savedUser);
    }


    // verification email
    await sendVerificationEmail(email, username, verificationCode);


    // response
    return NextResponse.json(
      {
        message: "Temporary user created successfully",
        verificationCode,  // remove in prod
        success: true
      }, 
      {status: 201}
    );


  } catch (error: any) {
    console.log("Error in user registration : ", error);
    return NextResponse.json({error: error.message}, {status: 500});
  }
}