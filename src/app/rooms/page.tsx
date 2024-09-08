import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/Components/Header/Header";
import SideBar from "@/Components/SideBar/SideBar";
import RoomContainer from "@/Components/RoomContainer/RoomContainer";
import RoomCard from "@/Components/RoomCard/RoomCard";
import CategoriesCard from "@/Components/CategoriesCard/CategoriesCard";
import style from '../../styles/room.module.css';
import { Inter } from "next/font/google";
import news from '../../assets/images/news-icon.svg';
import Posts, { Category } from "@/types/types";
import { getData, getdbs, getTopicCategories } from "@/utils/utils";

const inter = Inter({ subsets: ['latin'], style:["normal"] });

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
        // <main className="flex-1 bg-[#1C4E80]">   
        //     <Header/>

        //     <div className="w-full mx-auto p-3 md:flex md:min-h-[calc(-65px+100vh)] md:p-0">
        //         {/* <div id="room-list-container" className="fixed top-0 bottom-0 left-0 w-48 overflow-hidden z-10 bg-black text-white border border-blue-400 md:static md:w-auto md:basis-72 md:grow-0 md:shrink-0">
        //             <ul className="p-5">
        //                 <li className="text-lg font-extrabold">News</li>
        //                 <li className="text-lg font-extrabold">Technology</li>
        //                 <li className="text-lg font-extrabold">Other</li>
        //             </ul>
        //         </div> */}
        //         <SideBar categories={categories}/>


        //         <RoomContainer/>

        //     </div>


        // </main>
        <div className={`min-h-screen flex flex-col items-center`}>
            <div className={`${style.bg}`}></div>
            <div className="p-[1rem] w-full max-w-[1280px] xl:p-[2rem] my-0 mx-auto">
                <Header/>

                <div className="mt-2 mb-10">
                    <h1 className={`text-white text-center text-3xl ${inter.className} mb-[20px]`}>Categories</h1>  
                    <p className="text-[#b6b6b6] text-base text-center">This section contains all rooms within each category which you can chat in</p>
                </div>

                {/* <div>
                    {
                        categories!.map(cat=>(
                            <p className="text-white">{cat._id.toString()}</p>
                        ))
                    }
                </div> */}
                {
                    categories==null && <h1 className="text-center text-white text-xl">Could not fetch categories, please try again later...</h1>
                }

                <div id="category-room-section" className="flex flex-wrap gap-3 justify-center">
                    {
                        categories.map(cat=>(
                            // <div className="bg-white h-[160px] w-[90%] rounded-md max-w-[300px] flex justify-center items-center object-cover">
                            //     {cat.category}
                            // </div>
                            <CategoriesCard {...cat}/>
                        ))
                    }

                </div>
            </div>
        </div>
    )





    // return <h1>SUCCESFULL</h1>
}



export default Page;