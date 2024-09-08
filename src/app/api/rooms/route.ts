import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/utils/mongo";
import clientPromise from "@/utils/mongo";
import { ObjectId } from "mongodb";



export async function GET(req:NextRequest){

    try{
        const objectId = req.nextUrl.searchParams.get("category_id");

        if(objectId==null) throw new Error("Unknown object id");

        let client = await connectDB();

        const db = client.db("topicsdb");

        const roomCollection = db.collection("rooms"); // room collection reference

        const data = await roomCollection.find({
            "category_id":new ObjectId(objectId),
        }).toArray();


        return NextResponse.json({
            rooms:data,
            message:"Succesfull returned rooms for category"
        },{status:200});

    }catch(error){
        return NextResponse.json({
            message:"Unable to fetch rooms associated with category",
            rooms:[]
        },{status:404});

    }





}