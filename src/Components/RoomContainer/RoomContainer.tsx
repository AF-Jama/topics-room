"use client"

import React,{useState, useEffect,useReducer} from "react";



const RoomContainer = ()=>{
    const [roomSelected,setRoomSelected] = useState(false);






    return (
        <div id="room-card-container" className="flex-1 p-3 flex">
            <h1>Select room</h1>
        </div>
    )
}



export default RoomContainer;