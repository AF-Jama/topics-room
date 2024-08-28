"use client"

import React, {useState, useEffect, useReducer} from "react";
import Image from "next/image";
import Link from "next/link";
import { Roboto } from "next/font/google";
import { Room } from "@/types/types";
import style from '../../styles/room-card.module.css';

interface Props{
    room:Room
}

const roboto = Roboto({
    weight:"500",
    subsets:["cyrillic"],
    style:["normal"]
})



const RoomCard:React.FC<Props> = ({ room })=>{




    return (
        <Link href={`/chat/room/${room._id.toString()}`}>
            <div id="room-card" className={`p-3 flex justify-center items-center gap-x-5 rounded-md bg-white h-28 shadow-md`} key={room._id.toString()}>
                {/* <div id="img-container" className="h-16 w-16">
                    <Image src={url} className="h-full w-full dark:invert" alt=""/>
                </div> */}

                <div className="">
                    <h1 className={`text-lg text-black ${roboto.className}`}>{room.room_name}</h1>
                </div>
            </div>
        
        </Link>
    )
}



export default RoomCard;