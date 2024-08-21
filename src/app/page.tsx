import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import NewsCard from '../assets/images/news-icon.svg';
import Header from "@/Components/Header/Header";
import CategoriesCard from "@/Components/CategoriesCard/CategoriesCard";

const inter = Inter({
  style:"normal",
  subsets:["latin"],
  weight:"400"
})



const Page:React.FC = ()=>{




  return (
    <main className="flex-1 bg-[url('../assets/images/hero-dark-background.jpg')]">
      <Header/>
      <div id="inner-container" className="w-[95%] max-w-7xl mx-auto pt-12 px-5 pb-8">
        <div id="hero-container">
          <div id="heading-text-container">
            <h1 className={`${inter.className}text-slate-900 font-extrabold text-4xl text-center sm:text-5xl lg:text-5xl dark:text-white`}>Talk to anyone about the topics you want, anytime</h1>
          </div>
          <div id="sub-text">
            <p className={`${inter.className} text-center mt-6 text-slate-600 max-w-xl mx-auto text-lg`}>This is your go-to space for engaging conversations about current events and trending topics. Stay updated, share your insights, and join a community of people passionate about whats happening in the world right now</p>
          </div>
          <div id="get-started-btn" className="flex justify-center mt-6">
            <Link href="/rooms">
              <button className={`${inter.className} bg-blue-600 px-5 py-2 rounded-xl font-bold text-lg`}>Get Started</button>          
            </Link>
          </div>
        </div>

        <div id="categories-container" className="grid grid-cols-2 md:grid-cols-3 mt-6 p-2 gap-y-4">
          <CategoriesCard category="News" url={NewsCard}/>
          <CategoriesCard category="Technology" url={NewsCard}/>
          <CategoriesCard category="Sports" url={NewsCard}/>
          <CategoriesCard category="Finance" url={NewsCard}/>
          <CategoriesCard category="Politics" url={NewsCard}/>
        </div>
      </div>
    </main>
  )

}



export default Page;