"use client"

import { ObjectId } from "mongodb";
import React, {createContext} from "react"; 

interface Props{
    categoryValue:ObjectId | null; // category selected is null or category string
    setCategoryState:React.Dispatch<React.SetStateAction<ObjectId|null>>,
}


const roomContext = createContext<Props>({
    categoryValue:null,
    setCategoryState:()=>{}
});



export default roomContext;