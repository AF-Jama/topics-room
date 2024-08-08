"use client"

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";

interface Props{
    url:string;
    category:string;
}

const inter = Inter({
    weight:"500",
    subsets:["latin"],
    style:"normal"
})



const CategoriesCard:React.FC<Props> = ({ url, category })=>{




    return (
        <div id="categories-card" className="flex gap-x-2 items-center">
            <div className="h-10 w-10 md:h-12 md:w-12">
                <Image src={url} className="w-full h-full" alt=""/>
            </div>
            <p className={`${inter.className} text-white md:text-lg`}>{category}</p>   
        </div>
    )
}



export default CategoriesCard;