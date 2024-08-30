"use client"

import React, { useState, useEffect, useRef, createRef } from "react";
import { Input } from "@chakra-ui/react";
import Message from "../Message/Message";
import { ChatMessage, Room } from "@/types/types";
import { io, Socket } from "socket.io-client";

interface Props{
    messageData:{
        message:string,
        data:ChatMessage[]
    }|null,
    roomData:Room
}



const ChatContainer:React.FC<Props> = ({ messageData, roomData })=>{
    const [inputText,setInputText] = useState(''); // set input text state
    const [messages,setMessages] = useState<ChatMessage[]>(messageData!.data) // set message state ????
    const [error,setError] = useState(false); // set error state
    const [socket,setSocket] = useState<Socket>();
    const inputRef = createRef<HTMLInputElement>();


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

            inputRef.current!.value="";

            setInputText('');


        }catch(error){
            setError(true);

        }

    }

    
    useEffect(()=>{
        
        // const socket = io('http://localhost:5000');
        const socket = io("http://localhost:5000");

        setSocket(socket); // once socket establishes connection on client it state is set
        
        // if(error){
            //     setTimeout(()=>{
                //         setError(false)
                //     },2000)
                // }

        // socket.on('new message',(message)=>{
        //     console.log(message);
        // })

        socket.on('display',(message)=>{
            console.log("Typing....");
        })

        socket.on("hello",(data)=>console.log(data))

        socket.on("change",(msg:ChatMessage)=>{
            console.log("New document");
            if(msg.room_id.toString()==roomData._id.toString()){
                setMessages((prevState)=>[msg,...prevState]);
                
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
        <div id="chat-outer-container" className="flex flex-col min-h-[calc(-45px+100vh)] bg-white p-2">
        <div className="flex-1 border-[1px] border-gray-500 mb-2 rounded-md p-1">

            <div className="h-[calc(-120px+100vh)] bg-blue-500 overflow-y-scroll p-2 flex flex-col-reverse ">
                {
                    (messages==null)?<p>No Data in {roomData.room_name}</p>: messages.map(message=>(
                        <Message {...message} key={message._id.toString()} />
                    ))
                }
                <p className="text-white">{inputText}</p>

            </div>

        </div>

        <div className="flex text-input-container">
            <Input placeholder="Type message here" overflowWrap="break-word" className="flex-1 mr-2" onChange={onInputChange} ref={inputRef} onKeyDown={(e)=>socket!.emit("typing",true)} />
            <button className="bg-green-500 rounded-md py-2 px-4" onClick={onMessageSubmit}>Submit</button>
        </div>

    </div>
    )
}



export default ChatContainer;