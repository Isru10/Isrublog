import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) return NextResponse.json({ authenticated: false }, { status: 401 });
    
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json({ authenticated: true, user: { id: decoded.id, name: decoded.name, email: decoded.email } });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}