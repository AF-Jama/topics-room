"use client"
import React from "react";
import Image from "next/image";
import styles from '../../styles/message.module.css';
import { ChatMessage } from "@/types/types";


const Message:React.FC<ChatMessage> = ({ _id, city_name, country_code, country_name, created_at, ip_address, message, room_id })=>{



    return (
        <div id="message-container" className="w-[95%] max-w-[500px] flex bg-white rounded-md px-1 py-3 my-1">
            <div className="h-12 w-12 mr-2 flex flex-col">
                <Image src={`https://flagcdn.com/h240/${country_code.toLowerCase()}.png`} className="h-full w-full mb-2" width={500} height={500} alt=""/>
                <div>
                    {country_code}
                </div>
            </div>

            <div className={`flex-1 relative ${styles.test}`}>
                <div className="text-wrap flex-1 border-l-[1px] border-black p-1 z-10">
                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    qui officia deserunt mollit anim id est laborum cupidatat non proident cupidatat non proident cupidatat non proident cupidatat non proident. */}
                    {message}
                </div>

                <button className="z-10 bg-blue-500 rounded-md px-4 py-2 absolute bottom-[1px] right-0">Delete</button>
            </div>
        </div>
    )

}



export default Message;