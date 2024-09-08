import React from "react";
import Header from "@/Components/Header/Header";
import style from '../../../styles/room.module.css';
import { Inter } from "next/font/google";
import { Room, Rooms } from "@/types/types";
import RoomCard from "@/Components/RoomCard/RoomCard";

const inter = Inter({ subsets: ['latin'], style:['normal'] });


interface Props{
    params:{ slug: string }
}


const getRooms = async (id:string)=>{
    try{
        let response = await fetch(`${process.env.HOST}/api/rooms?category_id=${id}`);

        if(!response.ok) throw new Error("Could not fetch rooms");

        let res = await response.json();


        return res;

    }catch(error){
        return null;
    }
}


const Page:React.FC<Props> = async ({ params })=>{

    const rooms = await getRooms(params.slug) as {rooms:Room[],message:string}|null;

    // console.log(rooms);




    return (
        <div className="min-h-screen flex flex-col">
            <div className={`${style.bg}`}></div>
            <Header/>

            {
                (rooms==null || rooms.rooms.length==0)?<h1 className="text-white text-3xl text-center mt-[16px]">Could not fetch rooms or room does not exist in category</h1>
                :

                <div className="p-[1rem] w-full max-w-[1280px] xl:p-[2rem] my-0 mx-auto mt-[20px]">

                    <div className="mt-2 mb-10">
                        <h1 className={`text-white text-center text-3xl ${inter.className} mb-[20px]`}>Rooms</h1>  
                        <p className="text-[#b6b6b6] text-base text-center">Here all the rooms in this category</p>
                    </div>
                    

                    <div className="flex flex-wrap gap-3 justify-center">
                        {
                            rooms.rooms.map(room=>(
                                <RoomCard room={room}/>
                            ))
                        }
                    </div>

                </div>
            }

        </div>
    )
}



export default Page;