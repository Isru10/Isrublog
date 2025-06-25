import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connect from "@/lib/db";
import Post from "@/lib/models/post";
import mongoose, { Types } from "mongoose";

// Helper to get user ID from token
const getUserIdFromToken = (request: NextRequest): string | null => {
    try {
        const token = request.cookies.get("token")?.value || "";
        if (!token) return null;
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        return decoded.id;
    } catch (error) {
        return null;
    }
};












export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid post ID format." }, { status: 400 });
  }
  try {
    await connect();
    const post = await Post.findOne({ _id: id });

    if (!post) {
      return NextResponse.json({ message: "Post not found." }, { status: 404 });
    }

    return NextResponse.json({ post }, { status: 200 });

  } catch (error) {
    console.error(`API Error fetching post ${id}:`, error);
    return NextResponse.json({ message: "An internal server error occurred." }, { status: 500 });
  }
}


// UPDATE A POST (SECURE, REQUIRES OWNERSHIP)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const userId = getUserIdFromToken(request);
  if (!userId) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  try {
    await connect();
    const post = await Post.findById(params.id);

    // Ownership check
    if (!post || post.authorId.toString() !== userId) {
      return NextResponse.json({ message: "Forbidden: You do not own this post." }, { status: 403 });
    }

    const { newTitle: title, newContent: content } = await request.json();
    await Post.findByIdAndUpdate(params.id, { title, content });
    return NextResponse.json({ message: "Post updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "An error occurred while updating the post." }, { status: 500 });
  }
}

// DELETE A POST (SECURE, REQUIRES OWNERSHIP)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const userId = getUserIdFromToken(request);
  if (!userId) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  try {
    await connect();
    const post = await Post.findById(params.id);

    // Ownership check
    if (!post || post.authorId.toString() !== userId) {
      return NextResponse.json({ message: "Forbidden: You do not own this post." }, { status: 403 });
    }

    await Post.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "An error occurred while deleting the post." }, { status: 500 });
  }
}