import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/Components/Header/Header";
import SideBar from "@/Components/SideBar/SideBar";
import RoomContainer from "@/Components/RoomContainer/RoomContainer";
import RoomCard from "@/Components/RoomCard/RoomCard";
import news from '../../assets/images/news-icon.svg';
import Posts, { Category } from "@/types/types";
import { getData, getdbs, getTopicCategories } from "@/utils/utils";


const Page:React.FC = async  ()=>{
    // const data = await getData() as Array<Posts> | null;

    // if(data==null) return <h1>Unable to fetch data</h1>

    // return data.map(post=>(
    //     <a href="#" className="border-2 border-blue-500">
    //         SUCCESFULL
    //         <div className="my-2 p-2 border border-black rounded-xl">
    //             <h1>{post.title}</h1>
    //             <p>{post.body}</p>
    //             <p>{post.id}</p>
    //             <p>{post.userId}</p>
    //         </div>
    //     </a>
    // ));

    let categories = await getTopicCategories() as Category[];

    return (
        <main className="flex-1">   
            <Header/>

            <div className="w-full mx-auto p-3 border border-black md:flex md:min-h-[calc(-65px+100vh)] md:p-0">
                {/* <div id="room-list-container" className="fixed top-0 bottom-0 left-0 w-48 overflow-hidden z-10 bg-black text-white border border-blue-400 md:static md:w-auto md:basis-72 md:grow-0 md:shrink-0">
                    <ul className="p-5">
                        <li className="text-lg font-extrabold">News</li>
                        <li className="text-lg font-extrabold">Technology</li>
                        <li className="text-lg font-extrabold">Other</li>
                    </ul>
                </div> */}
                <SideBar categories={categories}/>


                <RoomContainer/>

            </div>


        </main>
    )





    // return <h1>SUCCESFULL</h1>
}



export default Page;