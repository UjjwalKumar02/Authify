import { connectDb } from "@/lib/db"
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";



await connectDb();


export async function POST(request: NextRequest){
  try {
    const reqBody = await request.json();
    const {email, password} = await reqBody;

    
    // find the user
    const user = await User.findOne({email});
    if(!user){
      return NextResponse.json({error: "Invalid credentials"}, {status: 400});
    }


    // validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      return NextResponse.json({error: "Invalid password"}, {status: 400});
    }


    // create access and refresh tokens
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username
    };

    const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET!, {expiresIn: "10s"});
    const refreshToken = jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET!, {expiresIn: "7d"});


    // save refresh token in db
    user.refreshToken = refreshToken;
    await user.save();


    // response
    const response = NextResponse.json(
      {
        message: "Login success",
        accessToken,
        username: user.username,
        success: true
      },
      {status: 200}
    );

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      // sameSite: "Strict",
      // path: "/",
      // maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;


  } catch (error: unknown) {
    console.log("Error in user login : ", error)
    return NextResponse.json({error: "Error in user login"}, {status: 500});
  }
}