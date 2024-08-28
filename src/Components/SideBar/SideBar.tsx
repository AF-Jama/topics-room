"use client"

import React,{useState,useEffect, useContext} from "react";
import roomContext from "@/Contexts/RoomContext/RoomContext";
import { Roboto } from "next/font/google";
import style from '../../styles/sidebar.module.css';
import { Category } from "@/types/types";


interface Props{
    categories:Category[] | null
}

const roboto = Roboto({
    weight:"400",
    style:["normal","italic"],
    subsets:["cyrillic"]
})


const SideBar:React.FC<Props> = ({ categories })=>{
    const [visibility,setVisibility] = useState(false); // set visibility state
    const { categoryValue, setCategoryState } = useContext(roomContext);


    // useEffect(()=>{

    // },[]);





    return (
        <div id="room-list-container" className={`fixed top-0 bottom-0 left-0 ${visibility?"w-48":"w-0"} duration-75 overflow-hidden z-10 bg-white text-white border border-blue-400 md:static md:w-auto md:basis-72 md:grow-0 md:shrink-0`}>
                    <div id="b-btn-container" className={`${visibility?"absolute top-0 right-0":"fixed top-0 left-[10px]"}  text-white ${visibility?`${style.change}`:`${style.container}`} duration-1000 md:hidden`} onClick={()=>setVisibility(!visibility)}>
                        <div id="div1" className={`h-[3px] w-[35px] my-[6px] mr-[2px] ml-[0px] ${visibility?"bg-black":"bg-black"}`}></div>
                        <div id="div2" className={`h-[3px] w-[35px] my-[6px] mr-[2px] ml-[0px] ${visibility?"bg-black":"bg-black"}`}></div>
                        <div id="div3" className={`h-[3px] w-[35px] my-[6px] mr-[2px] ml-[0px] ${visibility? "bg-black":"bg-black"}`}></div>
                    </div>
                    <ul className="p-5">
                        {/* <li value="News" className={`${roboto.className} text-lg font-extrabold`}>News</li>
                        <li value="Technology" className={`${roboto.className} text-lg font-extrabold`}>Technology</li>
                        <li value="Finance" className={`${roboto.className} text-lg font-extrabold`}>Finance</li> */}
                        {(categories==null)?<p>Could not fetch categories</p>:categories.map(category=>(
                            <li value={category._id.toString()} onClick={()=>setCategoryState(category._id)} key={category._id.toString()} className={`${roboto.className} text-lg font-extrabold text-black`}>{category.category}</li>
                        ))}
                    </ul>
        </div>
    )
}



export default SideBar;