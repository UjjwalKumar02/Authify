import { connectDb } from "@/lib/db";
import TempUser from "@/models/tempUserModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";



connectDb();


export async function POST(request: NextRequest){
  try {
    const reqBody = await request.json();
    const {email, verificationCode} = reqBody;


    // finding the user with email
    const tempUser = await TempUser.findOne({email: email.toLowerCase()});

    if(!tempUser){
      return NextResponse.json({error: "Backend not supporting, wait..!"}, {status: 400});
    }


    // validate the code
    if(tempUser.verificationCode !== verificationCode){
      return NextResponse.json({error: "Invalid code!"}, {status: 400});
    }
    
    if(tempUser.codeExpiry < new Date()){
      return NextResponse.json({error: "Code expired, please register again!"}, {status: 400});
    }


    // create new user
    const newUser = new User({
      username: tempUser.username,
      email: tempUser.email,
      password: tempUser.password,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);


    // delete the temp user
    await TempUser.deleteOne({email: email.toLowerCase()}); 


    // response
    return NextResponse.json(
      {
        message: "User registered successfully",
        success: true
      }, 
      {status: 201}
    );


  } catch (error: unknown) {
    console.log("Error in user verification: ", error);
    return NextResponse.json({error: "Error in user verification"}, {status: 500});
  }
}