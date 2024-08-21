import Posts from "@/types/types";
import mongoClient from "./mongo";
import clientPromise from "./mongo";
import { List } from "postcss/lib/list";
import { z } from "zod";
import { MongoClient } from "mongodb";


const getData = async ()=>{
    try{
        let res = await fetch("https://jsonplaceholder.typicode.com/posts");

        if(!res.ok) throw Error("Fetching Error");

        let ress = await res.json();

        return ress;

    }catch(error){
        return null;
    }
}


const getdbs = async ()=>{
    try{
        const client:MongoClient = await clientPromise;
    
        const db = client.db("topicsdb");
    
        return await db.collection("messages").countDocuments();
        
    }catch{
        return null;
    }
}

const getTotalNumberofMessages = async ()=>{
    try{
        const client:MongoClient = await clientPromise;

        const db = client.db("topicsdb");
    
        return await db.collection("messages").countDocuments();

    }catch(error){
        return null;
    }
}

const getTopicCategories = async ()=>{
    try{
        const client:MongoClient = await clientPromise;

        const db = client.db("topicsdb");

        const categoriesCollection = db.collection("categories");

        return await categoriesCollection.find().toArray(); 


    }catch(error){
        return null;
    }
}

const foo = (i:number)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(i==1){
                resolve("Promise resolved")
            }else{
                reject("Promise rejected")
            }
        },2000)
    });
}

const postSchema =  z.object({
    "message":z.string(),
    "room_id":z.string(),
    "timestamp":z.number(),
})

const paginationSchema = z.object({
    "room_id":z.string(),
    page:z.number(),
})

const getLocationData = async (ip:string)=>{
    try{
        let response = await fetch(`${process.env.GEO_API}/${ip}`); 

        if(!response.ok) throw new Error("Unable to fetch geo data");

        let res = await response.json(); // parses json data

        return res;

    }catch(error){
        throw new Error("Unable to fetch geo data");
    }
}



export {
    getData,
    getdbs,
    getTopicCategories,
    getLocationData,
    foo,
    postSchema,
    paginationSchema
}