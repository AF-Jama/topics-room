"use client"

import React from "react";
import { useRouter } from 'next/navigation'
import Image from "next/image";
import Link from "next/link";
import { Category } from "@/types/types";
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



const CategoriesCard:React.FC<Category> = ({ _id, category, created_at, image })=>{
    const router = useRouter()




    return (
        // <div id="categories-card" className="flex gap-x-2 items-center">
        //     <div className="h-10 w-10 md:h-12 md:w-12">
        //         <Image src={url} className="w-full h-full" alt=""/>
        //     </div>
        //     <p className={`${inter.className} text-white md:text-lg`}>{category}</p>   
        // </div>

        <div className={`bg-white h-[160px] w-[90%] rounded-md max-w-[300px] flex justify-center items-center object-cover font-extrabold text-blue-700 text-lg transition-transform duration-500 ease-in-out hover:scale-110`} style={{ backgroundImage: `url(${image})`, backgroundSize:"cover", }} onClick={(e)=>router.push(`rooms/${_id.toString()}`)}>
            {/* {category} */}
        </div>      
    )
}



export default CategoriesCard;