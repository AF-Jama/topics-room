import React from "react";
import Header from "@/Components/Header/Header";

interface Props{
    params:{ slug: string }
}



const Page:React.FC<Props> = ({ params })=>{





    return (
        <div className="flex-1 bg-blue-500">
            <Header/>

        </div>
    )

}



export default Page;