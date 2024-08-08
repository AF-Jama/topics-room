"use client"

import React from "react";
import Image from "next/image";
import chatLogo from '../../assets/images/chat-icon.svg';

const Header:React.FC = ()=>{



    return (
        <header className="min-h-[2vh]"> 
            <div id="header-inner-container" className="w-[95%] max-w-4xl my-0 mx-auto flex justify-center items-center p-2">       
                <div id="img-container" className="relative">
                    <Image src={chatLogo} className="h-10 w-10 md:w-12 md:h-12" objectFit="cover" alt=""/>
                    <span className="absolute right-[-35px] bottom-0 text-white">Chat</span>
                </div>
            </div>
        </header>
    )
}



export default Header;