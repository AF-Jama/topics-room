"use client"

import React, { useState, useEffect, createRef, SyntheticEvent, useRef } from "react";
import { Input } from "@chakra-ui/react";
import { Room } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import { Socket } from "socket.io-client";
import leftArrow from '../../assets/images/left-arrow.png';
import { Roboto } from "next/font/google";
import { ChatMessage } from "@/types/types";
import Message from "../Message/Message";
import { io } from "socket.io-client";
import { ObjectId } from "mongodb";


interface Props{
    messageData:{
        message:string,
        data:ChatMessage[]
    }|null,
    roomData:Room
}

const roboto = Roboto({
    weight:"400",
    style:"normal",
    subsets:["latin"]
})


const ChatRoomContainer:React.FC<Props> = ({ roomData, messageData })=>{
    const [inputText,setInputText] = useState(''); // set input text state
    const [messages,setMessages] = useState<ChatMessage[]>(messageData!.data) // set message state ????
    const [error,setError] = useState(false); // set error state
    const [socket,setSocket] = useState<Socket>();
    const inputRef = useRef<HTMLInputElement>(null);
    const [activeTyping,setActiveTyping] = useState(false);
    const [page,setPage] = useState(1); // set page state
    const [lastId,setLastId] = useState(((messageData==null||messageData.data.length==0)?null:messageData.data[messageData.data.length-1]._id)); // set id of last message
    const [isLastPage,setIsLastPage] = useState(false); // set last page
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    var typingTimer:NodeJS.Timeout;
    const PAGE_LIMIT = 10; // page limit



    const onInputChange = (e:React.FormEvent<HTMLInputElement>)=>{
        e.preventDefault();

        setInputText(e.currentTarget.value);

    }


    const changeMessageState = (data:ChatMessage[])=>  setMessages((prevData)=>[...prevData,...data]) // spread old data and new data

    const onMessageSubmit = async (e:any)=>{
        // triggers message submit and subsequently causes message collection listener to listen for a changes within collection
        e.preventDefault();

        if(!inputText) return;

        try{
            let response = await fetch(`http://localhost:3000/api/post`,{
                method:"POST",
                body:JSON.stringify({
                  room_id:roomData._id,
                  message:inputText  
                })
            })

            if(!response.ok) throw Error(`Could not add your message to ${roomData.room_name}, try again later `);

            // (inputRef.current as HTMLInputElement).value=' ';
            inputRef.current!.value='';

            setInputText('');


        }catch(error){
            setError(true);

        }

    }


    const fetchOnScroll = async (room_id:string,last_id:ObjectId|null)=>{
        try{
            let response = await fetch(`/api/post?room_id=${room_id}${last_id!=null && `&last_id=${last_id}`}`);

            if(!response.ok) throw Error("Unable to fetch posts");

            let res = await response.json() as {message:string,data:ChatMessage[]} ; // parses json to object
            

            setMessages((prevState)=>[...prevState,...res.data]); // prev state and new page data spread
            setPage((prevState)=>prevState+1);
            setIsLastPage(((res.data.length<PAGE_LIMIT)?true:false)) // if returned message data is less than page limit then last page has been reached
            setLastId(res.data[res.data.length-1]._id); // set last id of messages
        }catch(error){
            throw Error("Could not fetch posts");
        }
    }


    const onTyping = (e:any)=>{
        // e.preventDefault();

        clearTimeout(typingTimer); // clear existing timeout which exists on queue timer

        typingTimer = setTimeout(()=>{
            socket?.emit("doneTyping",{typing:false,room_id:roomData._id});
        },3000); // set timeout, placed in timer and callback queue

        socket?.emit("typing",{typing:true,room_id:roomData._id});

        
    }

    
    useEffect(()=>{
        
        // const socket = io('http://localhost:5000');
        const socket = io(process.env.NEXT_PUBLIC_WS_HOST as string);

        setSocket(socket); // once socket establishes connection on client it state is set
        
        // if(error){
            //     setTimeout(()=>{
                //         setError(false)
                //     },2000)
                // }

        // socket.on('new message',(message)=>{
        //     console.log(message);
        // })

        socket.on("display",(data)=>{
            console.log("Typing...");
            if(roomData._id.toString()==data.room_id.toString()){
                setActiveTyping(true);
            }
        }) // triggered on client recives display event from connected server ??? may have to export room page into full client component

        socket.on('done',(data)=>{
            if(roomData._id.toString()==data.room_id.toString()){
                setActiveTyping(false);
            }
        })

        socket.on("hello",(data)=>console.log(data))

        // if(scrollContainerRef.current){
        //     scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        // }

        socket.on("change",(msg:ChatMessage)=>{
            console.log("New document");
            if(msg.room_id.toString()==roomData._id.toString()){
                setMessages((prevState)=>[msg,...prevState]);
                scrollContainerRef.current!.scrollTop = scrollContainerRef.current!.scrollHeight;
                
            }
        });

        socket.on("connect",()=>{
            console.log("Connected")
        })


        return () => {
            // Clean up the socket on component unmount
            socket.disconnect();
        };

    },[])





    return (
        <div className="min-h-[100vh] bg-[#1C4E80]">
        <section className="flex justify-between items-center shadow-lg p-2">

            <Link href={`/rooms`}>
                <Image src={leftArrow} className="h-7 w-7" alt=""/>
            </Link>

            {activeTyping && <p>Typing...</p>}

            <p className={`font-bold mr-1 text-white ${roboto.className}`}>{roomData.room_name}</p>

            {/* <div id="search-bar-container" className="basis-[200px]">
                <Input placeholder='Search chat' />
            </div>   */}
        </section>

        {/* <ChatHeader room_name={roomData.room_name} url={leftArrow}/>     */}

        {/* <div id="chat-outer-container" className="flex flex-col min-h-[calc(-45px+100vh)] bg-white p-2">
            <div className="flex-1 border-[1px] border-gray-500 mb-2 rounded-md p-1">

                <div className="h-[calc(-120px+100vh)] bg-blue-500 overflow-y-scroll p-2 flex flex-col-reverse ">
                    {
                        (messageData==null)?<p>No Data in {roomData.room_name}</p>: messageData.data.map(message=>(
                            <Message {...message} />
                        ))
                    }

                </div>

            </div>

            <div className="flex text-input-container">
                <Input placeholder="Type message here" overflowWrap="break-word" className="flex-1 mr-2" />
                <button className="bg-green-500 rounded-md py-2 px-4">Submit</button>
            </div>

        </div> */}

        {/* <ChatContainer roomData={roomData} messageData={messageData}/> */}

        <div id="chat-outer-container" className="flex flex-col min-h-[calc(-45px+100vh)] bg-white p-2">
            <div className="flex-1 border-[1px] border-gray-500 mb-2 rounded-md p-1">

                <div className="h-[calc(-120px+100vh)] bg-blue-500 overflow-y-scroll p-2 flex flex-col-reverse " onScroll={async (e:SyntheticEvent)=>{
                    console.log("Scrolled")
                    const target = e.target as HTMLElement;

                    const { scrollTop, scrollHeight, offsetHeight } = target;

                    if(scrollTop==-(scrollHeight-offsetHeight) && !isLastPage){
                        // triggered once user scrolls to top of container and fetch results is not last page
                        await fetchOnScroll(roomData._id.toString(),lastId);
                    }

                    // console.log({
                    //     scrollTop: target.scrollTop,
                    //     offsetHeight: target.offsetHeight,
                    //     scrollHeight: target.scrollHeight,
                    //   });   
                }} ref={scrollContainerRef}>
                    {
                        (messages==null)?<p>No Data in {roomData.room_name}</p>: messages.map(message=>(
                            <Message {...message} key={message._id.toString()} />
                        ))
                    }
                    {/* <p className="text-white">{inputText}</p> */}

                </div>

            </div>

            <div className="flex text-input-container">
                <Input placeholder="Type message here" overflowWrap="break-word" className="flex-1 mr-2" onChange={onInputChange} ref={inputRef} onKeyDown={onTyping} />
                <button className="bg-green-500 rounded-md py-2 px-4" onClick={onMessageSubmit}>Submit</button>
            </div>

    </div>

    </div>
    )
}



export default ChatRoomContainer;