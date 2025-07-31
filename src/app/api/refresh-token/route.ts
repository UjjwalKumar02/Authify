import { connectDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";



await connectDb();


export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get("refreshToken")?.value;
    if (!refreshToken) {
      return NextResponse.json({ error: "No token found" }, { status: 401 });
    }


    // validate the refreshToken
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as any;

    const user = await User.findById(payload.id);

    if (!user || user.refreshToken !== refreshToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }


    // generate new access token
    const newAccessToken = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "10s" }
    );


    // response
    return NextResponse.json({ accessToken: newAccessToken }, { status: 200 });

    
  } catch (error) {
    console.log("Error refreshing token:", error);
    return NextResponse.json({ error: "Invalid or expired refresh token" }, { status: 403 });
  }
};