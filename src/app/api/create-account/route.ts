import { connectDb } from "@/lib/db";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";



connectDb();

export async function POST(request: NextRequest){
  try {
    const reqBody = await request.json();
    const {email, username, password} = await reqBody;

    const normalizedEmail = email.toLowerCase();


    // Check if user already exists
    const existedUser = await User.findOne({email: normalizedEmail});

    if(existedUser){
      return NextResponse.json({error: "User already exists!"}, {status: 400});
    }


    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    // create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    
    return NextResponse.json(
      {
        message: "User created successfully",
        success: true
      }, 
      {status: 201}
    );


  } catch (error: any) {
    console.log("Error in user registration : ", error);
    return NextResponse.json({error: error.message}, {status: 500});
  }
}