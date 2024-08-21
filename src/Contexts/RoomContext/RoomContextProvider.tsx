"use client"

import React, { useState, useEffect} from "react";
import roomContext from "./RoomContext";
import { ObjectId } from "mongodb";


const RoomContextProvider = ({ children }:{ children: React.ReactNode })=>{
    const [categoryValue,setCategoryValue] = useState<ObjectId|null>(null);


    // useEffect(()=>{
    //     console.log(`Clicked is ${categoryValue?.toString()||null}`)
    // },[categoryValue])







    return (
        <roomContext.Provider value={{
            categoryValue:categoryValue, 
            setCategoryState:setCategoryValue,
        }}>
            {children}
        </roomContext.Provider>
    );
}



export default RoomContextProvider;