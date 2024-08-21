"use client"

import React,{useState, useEffect,useReducer, useContext} from "react";
import { Spinner } from "@chakra-ui/react";
import roomContext from "@/Contexts/RoomContext/RoomContext";
import { Room, Rooms } from "@/types/types";
import useFetch from "@/customHooks/useFetch";
import RoomCard from "../RoomCard/RoomCard";




const RoomContainer = ()=>{
    const [roomSelected,setRoomSelected] = useState(false);
    const { categoryValue, setCategoryState } = useContext(roomContext);
    const { data, loading,error }:{data:Rooms,loading:boolean,error:boolean} = useFetch(`/api/rooms?category_id=${categoryValue}`);
    





    return (
        
        <div id="room-card-container" className="flex-1 flex flex-col gap-y-2 lg:grid lg:grid-cols-2 lg:gap-2 md:relative p-2">
            {categoryValue==null && <p className="fixed top-[50%] left-[50%] h-[100px] w-[150px] ml-[-75px] mt-[-50px] md:absolute">Select a category</p>}
            {loading && (
                <div className="fixed top-[50%] left-[50%] h-[100px] w-[150px] ml-[-75px] mt-[-50px] md:absolute">
                    <Spinner/>
                </div>
            )}
            {(error && categoryValue!=null) && <p>Error</p> }

            {
                (data && categoryValue!=null && data.rooms.length>0) 

                && 

                data.rooms.map(room=>(
                    <RoomCard room={room} key={room._id.toString()}/>
                ))
            }

            {
                (data && categoryValue!=null && data.rooms.length==0)

                &&

                <p className="fixed top-[50%] left-[50%] h-[100px] w-[250px] ml-[-125px] mt-[-50px] md:absolute text-center">No Rooms in this category</p>
            }
        </div>
    )
}



export default RoomContainer;