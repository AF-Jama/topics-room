"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Roboto } from "next/font/google";
import { io } from "socket.io-client";

interface Props{
    url:any,
    room_name:string,
}

const roboto = Roboto({
    weight:"400",
    style:"normal",
    subsets:["latin"]
})



const ChatHeader:React.FC<Props> = ({ url, room_name })=>{
    const [activeTyping,setActiveTyping] = useState(false);


    useEffect(()=>{
        let socket = io("http://localhost:5000");


        socket.on("display",(data)=>{
            setActiveTyping(true);
        }) // triggered on client recives display event from connected server ??? may have to export room page into full client component



        return ()=>{
            socket.disconnect();
        }



    },[])



    return (
        <section className="flex justify-between items-center shadow-lg p-2">

            <Link href={`/rooms`}>
                <Image src={url} className="h-7 w-7" alt=""/>
            </Link>

            {activeTyping && <p>User typing....</p>}

            <p className={`font-bold mr-1 text-white ${roboto.className}`}>{room_name}</p>

            {/* <div id="search-bar-container" className="basis-[200px]">
                <Input placeholder='Search chat' />
            </div>   */}
        </section>
    )
}



export default ChatHeader;