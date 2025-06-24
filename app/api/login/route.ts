
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/lib/models/user";
import connect from "@/lib/db";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    await connect();
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ message: "Invalid credentials." }, { status: 400 });

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) return NextResponse.json({ message: "Invalid credentials." }, { status: 400 });
    
    const tokenData = { id: user._id, name: user.name, email: user.email };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: "1d" });

    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("token", token, {
      httpOnly: true, // Prevents client-side JS access
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}