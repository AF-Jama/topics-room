import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/Components/Header/Header";
import Message from "@/Components/Message/Message";
import ChatHeader from "@/Components/ChatHeader/ChatHeader";
import ChatContainer from "@/Components/ChatContainer/ChatContainer";
import ChatRoomContainer from "@/Components/ChatRoomContainer/ChatRoomContainer";
import leftArrow from '../../../../assets/images/left-arrow.png';
import { Input,InputGroup } from '@chakra-ui/react';
import clientPromise from "@/utils/mongo";
import { ChatMessage, Room } from "@/types/types";
import { ObjectId } from "mongodb";
import { Roboto } from "next/font/google";

interface Props{
    params:{ slug: string }
}

const roboto = Roboto({
    weight:"400",
    style:"normal",
    subsets:["latin"]
})

const getRoomData = async (id:string)=>{

    try {
            let client = await clientPromise;
        
            const db = client.db("topicsdb");
        
            const roomCollection = db.collection("rooms"); // room collection reference
        
            let query = roomCollection.findOne({_id:new ObjectId(id)})
        
        
            return await query;
    } catch (error) {
     return null;   
    }


}

const getRoomMessages = async (room_id:string):Promise<{data:ChatMessage[],message:string}|null>=>{
    try{
        let response = await fetch(`${process.env.HOST}/api/post?room_id=${room_id}`,{ cache:"no-cache" }); // no cache fetch

        if(!response.ok) throw Error("Could not fetch room messages");

        return await response.json();

    }catch(error){
        return null;
    }
}



const Page:React.FC<Props> = async ({ params })=>{

    const roomData = await getRoomData(params.slug) as Room|null;
    const messageData = await getRoomMessages(params.slug);

    if(roomData==null) return <h1>Could not return room data, try again next time</h1>
    





    return (
        // <div className="min-h-[100vh] bg-[#1C4E80]">
        //     {/* <section className="flex justify-between items-center shadow-lg p-2">

        //         <Link href={`/rooms`}>
        //             <Image src={leftArrow} className="h-7 w-7" alt=""/>
        //         </Link>

        //         <p className={`font-bold mr-1 text-white ${roboto.className}`}>{roomData.room_name}</p>

        //         <div id="search-bar-container" className="basis-[200px]">
        //             <Input placeholder='Search chat' />
        //         </div>  
        //     </section> */}

        //     <ChatHeader room_name={roomData.room_name} url={leftArrow}/>    

        //     {/* <div id="chat-outer-container" className="flex flex-col min-h-[calc(-45px+100vh)] bg-white p-2">
        //         <div className="flex-1 border-[1px] border-gray-500 mb-2 rounded-md p-1">

        //             <div className="h-[calc(-120px+100vh)] bg-blue-500 overflow-y-scroll p-2 flex flex-col-reverse ">
        //                 {
        //                     (messageData==null)?<p>No Data in {roomData.room_name}</p>: messageData.data.map(message=>(
        //                         <Message {...message} />
        //                     ))
        //                 }

        //             </div>

        //         </div>

        //         <div className="flex text-input-container">
        //             <Input placeholder="Type message here" overflowWrap="break-word" className="flex-1 mr-2" />
        //             <button className="bg-green-500 rounded-md py-2 px-4">Submit</button>
        //         </div>

        //     </div> */}

        //     <ChatContainer roomData={roomData} messageData={messageData}/>

        // </div>
        <ChatRoomContainer roomData={roomData} messageData={messageData}/>
    )

}



export default Page;