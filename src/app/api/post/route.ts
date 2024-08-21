import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/utils/mongo";
import { postSchema, getLocationData, paginationSchema } from "@/utils/utils";
import { IPDATA } from "@/types/types";
import { time } from "console";
import { ObjectId, Timestamp } from "mongodb";



export async function POST(req:NextRequest){
    const { message, room_id } = await req.json();
    
    try{

        const timestampInSeconds:number =   Math.floor(Date.now() / 1000);

        postSchema.parse({
            "message":message,
            "room_id":room_id,
            "timestamp":timestampInSeconds
        }) // validates post data schema or throws error
        
        // geo locate based on user ip

        // let dataResponse = await getLocationData(req.headers.get("x-forwarded-for")!);
        let dataResponse:IPDATA = await getLocationData("86.13.240.168");

        let client = await clientPromise;

        const db = client.db("topicsdb");

        const messagesCollection = db.collection("messages"); // room collection reference

        await messagesCollection.insertOne({
            message:message,
            room_id: new ObjectId(`${room_id}`),
            created_at:timestampInSeconds,
            country_code:dataResponse.countryCode,
            city_name:dataResponse.cityName,
            country_name:dataResponse.countryName,
            ip_address:dataResponse.ipAddress
        })


        return NextResponse.json({
            "message":`Succesfull post message in chat room:${room_id}`,
        },{status:200});


    }catch(error){

        return NextResponse.json({
            "message":`Unable to post message in chat room:${room_id}`
        },{status:401});

    }



}



export async function GET(req:NextRequest){
    try{
        // page limit
        const LIMIT=2; // message per limit

        // query param must use room_id and page number
        const room_id = req.nextUrl.searchParams.get("room_id");
        const page = req.nextUrl.searchParams.get("page");

        if(room_id==null || page==null) throw new Error("room id and page number must both be set");

        const page_number = parseInt(page,10);

        if(isNaN(page_number)||page_number<1) throw new Error("Invalid page number");

        let client = await clientPromise;

        const db = client.db("topicsdb");

        const messagesCollection = db.collection("messages"); // room collection reference

        // pagination ends once last page returns with less results than LIMIT

        const messageDocuments =  messagesCollection.find({
            "room_id":new ObjectId(`${room_id}`)
        }).limit(LIMIT).skip((page_number-1)*LIMIT);



        return NextResponse.json({
            "message":"SUCCESFULL",
            "prev":"",
            "next":"",
            data: await messageDocuments.toArray()
        },{status:200});



    }catch(error:any){
        return NextResponse.json({
            "message":"Could not get fetch data",
            data:[]
        },{status:401})

    }
}