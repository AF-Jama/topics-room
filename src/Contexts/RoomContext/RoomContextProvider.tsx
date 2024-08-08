"use client"

import React, { useState, useEffect} from "react";
import roomContext from "./RoomContext";


const RoomContextProvider = ({ children }:{ children: React.ReactNode })=>{
    const [roomValue,setRoomValue] = useState("News");







    return (
        <roomContext.Provider value={{
            category:roomValue, 
            setCategoryState:setRoomValue,
        }}>
            {children}
        </roomContext.Provider>
    );
}



export default RoomContextProvider;