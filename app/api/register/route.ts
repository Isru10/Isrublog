import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import User from "@/lib/models/user";
import connect from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    const hashedPassword = await bcryptjs.hash(password, 10);
    await connect();
    await User.create({ name, email, password: hashedPassword });
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "An error occurred while registering the user." }, { status: 500 });
  }
}