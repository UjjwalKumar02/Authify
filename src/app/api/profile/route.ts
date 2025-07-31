import { connectDb } from "@/lib/db";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";



await connectDb();


export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];


    // verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as any;


    // Find user
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // response
    return NextResponse.json({
      username: user.username,
      email: user.email,
    });

    
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
};