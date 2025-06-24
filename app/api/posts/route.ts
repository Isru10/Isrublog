// src/app/api/posts/route.ts
import connect from "@/lib/db";
import Post from "@/lib/models/post";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"; // Add import

// --- CREATE A NEW POST ---
// export async function POST(request: NextRequest) {
//   try {
//     const { title, content } = await request.json();
//     await connect();
//     await Post.create({ title, content });
//     return NextResponse.json({ message: "Post Created" }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ message: "An error occurred while creating the post.", error }, { status: 500 });
//   }
// }







export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    
    // Verify the token and get user info
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    
    const { title, content } = await request.json();
    await connect();
    
    // Create post with author information from the token
    await Post.create({
      title,
      content,
      authorId: decoded.id,
      authorName: decoded.name,
    });

    return NextResponse.json({ message: "Post Created" }, { status: 201 });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    return NextResponse.json({ message: "An error occurred while creating the post." }, { status: 500 });
  }
}



// --- GET ALL POSTS ---
export async function GET() {
  try {
    await connect();
    const posts = await Post.find().sort({ createdAt: -1 }); // Sort by newest
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json({ message: "An error occurred while fetching posts.", error }, { status: 500 });
  }
}