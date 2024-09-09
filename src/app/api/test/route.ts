import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";


export async function GET(req:Request){



    return NextResponse.json({
        x:`SUCCESFULL ${process.env.GEO_API}`
    })
}



export async function POST(req:Request){
    const { email, password }:{email:string,password:string} = await req.json();



    return NextResponse.json({
        email:email,
        password:password
    })


}