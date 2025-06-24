/* eslint-disable @typescript-eslint/no-explicit-any */

import connect from "@/lib/db";
import Category from "@/lib/models/category";
import User from "@/lib/models/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
    try {
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");
        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(
                JSON.stringify({message: "userId is required and must be valid"}),
                { status: 400 }
            );
        }
        await connect();
        const user = await User.findById(userId);
        if(!user){
            return new NextResponse(
                JSON.stringify({message: "User not found"}),
                { status: 404 }
            );
        }

        const categories = await Category.find({user: new Types.ObjectId(userId)});
        return new NextResponse(JSON.stringify(categories), { status: 200 });
    } catch (error: any) {
        return new NextResponse("Error in fetching categories" + error.message, { status: 500 });
    }
};

export const POST = async (request:Request) =>{
    try{
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");
        const {title} = await request.json();
        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(
                JSON.stringify({message: "userId is required and must be valid"}),
                { status: 400 }
            );
        }
        await connect();
        const user = await User.findById(userId);
        if(!user){
            return new NextResponse(
                JSON.stringify({message: "User not found"}),
                { status: 404 }
            );
        }

        const newCategory = new Category({
            title,
            user:new Types.ObjectId(userId)
        });
        await newCategory.save();
        return new NextResponse(JSON.stringify({message: "Category created successfully", category: newCategory}))
    }
        catch (error: any) {
        return new NextResponse("Error in creating categories" + error.message, { status: 500 });
    }



}