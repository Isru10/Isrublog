import connect from "@/lib/db";
import Category from "@/lib/models/category";
import User from "@/lib/models/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const PATCH = async (request: Request, context:{params:any}) => {
    const categoryId = context.params.category;
    try{
        const body = await request.json();
        const {title} = body;
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");
        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(
                JSON.stringify({message: "userId is required and must be valid"}),
                { status: 400 }
            );
        }

        if(!categoryId || !Types.ObjectId.isValid(categoryId)){
            return new NextResponse(
                JSON.stringify({message: "categoryId is required and must be valid"}),
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

        const category = await Category.findOne({_id:categoryId,user:userId})
        if(!category){
            return new NextResponse(
                JSON.stringify({message: "Category not found"}),
                { status: 404 }
            );
        }

        const updatedCategory  = await Category.findByIdAndUpdate(
            categoryId,
            {title},
            {new: true}
        );
        return new NextResponse(JSON.stringify({message: "Category updated successfully", category: updatedCategory}), { status: 200 });
                              
    }
    catch(error: any) {
        return new NextResponse("Error updating category: " + error.message, { status: 500 });
    }
}

export const DELETE = async (request: Request, context:{params:any}) => {
        const categoryId = context.params.category;
    try {
         const {searchParams} = new URL(request.url);
         const userId = searchParams.get("userId");
      
         if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(
                JSON.stringify({message: "userId is required and must be valid"}),
                { status: 400 }
            );
        }

        if(!categoryId || !Types.ObjectId.isValid(categoryId)){
            return new NextResponse(
                JSON.stringify({message: "categoryId is required and must be valid"}),
                { status: 400 }
            );
        }
        await connect();
        const user = await User.findById(userId);
        if(!user) {
            return new NextResponse(
                JSON.stringify({message: "User not found"}),
                { status: 404 }
            );
        }

        const category = await Category.findOne({_id: categoryId, user: userId});
        if(!category) {
            return new NextResponse(
                JSON.stringify({message: "Category not found"}),
                { status: 404 }
            );
        }
        await Category.findByIdAndDelete({_id: categoryId});
        return new NextResponse(JSON.stringify({message: "Category deleted successfully"}), { status: 200 });
    }
    catch (error: any) {
        return new NextResponse("Error deleting category: " + error.message, { status: 500 });
    }
}