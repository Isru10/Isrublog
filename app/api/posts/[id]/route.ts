import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connect from "@/lib/db";
import Post from "@/lib/models/post";
import { Types } from "mongoose";

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

// GET A SINGLE POST (PUBLIC)
// export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     await connect();
//     const post = await Post.findOne({ _id: params.id });
//     if (!post) return NextResponse.json({ message: "Post not found." }, { status: 404 });
//     return NextResponse.json({ post });
//   } catch (error) {
//     return NextResponse.json({ message: "An error occurred while fetching the post." }, { status: 500 });
//   }
// }














export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  console.log(`[API START] GET /api/posts/${id}`);

  // --- CRUCIAL DEBUG STEP ---
  // Check if the environment variable is loaded on Vercel.
  // We will only log a portion of it for security.
  const mongoUri = process.env.MONGODB_URI;
  if (mongoUri) {
    console.log(`[API ENV] MONGODB_URI is present. Starts with: ${mongoUri.substring(0, 20)}...`);
  } else {
    console.error("[API ENV] CRITICAL ERROR: MONGODB_URI environment variable is NOT DEFINED on the server.");
  }
  // --- END DEBUG STEP ---

  try {
    console.log("[API DB] Attempting to connect to the database...");
    await connect();
    console.log("[API DB] Database connection successful.");

    console.log(`[API QUERY] Searching for post with _id: ${id}`);
    // const post = await Post.findOne({ _id: id });



    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
    }
    const post = await Post.findById(id); // Much cleaner and uses real ObjectId
    

    if (!post) {
      console.log(`[API RESULT] Post with _id: ${id} was NOT found.`);
      return NextResponse.json({ message: "Post not found." }, { status: 404 });
    }

    console.log(`[API RESULT] Successfully found post titled: "${post.title}"`);
    return NextResponse.json({ post }, { status: 200 });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error(`[API ERROR] An error occurred in the GET route for /api/posts/${id}:`, errorMessage);
    console.error(error); 
    
    return NextResponse.json({ message: "An internal server error occurred.", error: errorMessage }, { status: 500 });
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