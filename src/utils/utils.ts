import Posts from "@/types/types";
import mongoClient from "./mongo";
import { List } from "postcss/lib/list";


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
        await mongoClient.connect();

        const db = mongoClient.db("topicsdb");

        return db.listCollections();
        
    }catch{
        return null;
    }finally{
        await mongoClient.close();
    }
}



export {
    getData,
    getdbs
}