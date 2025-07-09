import { connectDb } from "@/lib/db";
import TempUser from "@/models/tempUserModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";



connectDb();


export async function POST(request: NextRequest){
  try {
    const reqBody = await request.json();
    const {email, verificationCode} = reqBody;


    // finding the user with the code

    const tempUser = await TempUser.findOne({email: email.toLowerCase(), verificationCode});

    if(!tempUser){
      return NextResponse.json({error: "Invalid code"}, {status: 400});
    }

    if(tempUser.codeExpiry < new Date()){
      return NextResponse.json({error: "Code expired!"}, {status: 400});
    }


    // resend token




    // create new user
    const newUser = new User({
      username: tempUser.username,
      email: tempUser.email,
      password: tempUser.password,
      isVerified: true
    });

    const savedUser = await newUser.save();
    console.log(savedUser);


    // delete the temp user
    await TempUser.deleteOne({email: email.toLowerCase(), verificationCode}); 


    return NextResponse.json(
      {
        message: "User registered successfully",
        success: true
      }, 
      {status: 201}
    );


  } catch (error: any) {
    console.log("Error in user verification: ", error);
    return NextResponse.json({error: error.message}, {status: 500});
  }
}