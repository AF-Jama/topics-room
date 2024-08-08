"use client"

import React, {useState, useEffect, useReducer} from "react";
import Image from "next/image";
import { Roboto } from "next/font/google";
import style from '../../styles/room-card.module.css';

interface Props{
    title:string;
    url:string;
}

const roboto = Roboto({
    weight:"500",
    subsets:["cyrillic"],
    style:["normal"]
})



const RoomCard:React.FC<Props> = ({ title, url })=>{




    return (
        <div id="room-card" className={`p-3 flex items-center gap-x-5 ${style.card} rounded-md`}>
            <div id="img-container" className="h-16 w-16">
                <Image src={url} className="h-full w-full dark:invert" alt=""/>
            </div>

            <div className="">
                <h1 className={`text-lg text-white ${roboto.className}`}>{title}</h1>
            </div>
        </div>
    )
}



export default RoomCard;