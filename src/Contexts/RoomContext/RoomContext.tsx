"use client"

import React, {createContext} from "react"; 

interface Props{
    category:string;
    setCategoryState:React.Dispatch<React.SetStateAction<string>>
}


const roomContext = createContext<Props>({
    category:"News",
    setCategoryState:()=>{}
});



export default roomContext;