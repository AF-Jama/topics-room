import { ObjectId, Timestamp } from "mongodb";

interface Posts{
    userId:number,
    id:number,
    title:string,
    body:string
}

interface Category{
    category:string,
    _id:ObjectId,
    created_at:Timestamp
}

interface Room{
    room_name:string,
    _id:ObjectId,
    created_at:Timestamp,
    category_id:ObjectId
}

interface Rooms{
    message:string,
    rooms:Room[]
}

interface Post{
    message:string,
    room_id:number,
    created_at:Timestamp
}

interface IPDATA{
    latitude:number,
    longitude:number,
    cityName:string,
    regionName:string,
    countryName:string,
    ipAddress:string,
    countryCode:string,
}



export default Posts;
export type{
    Category,
    Room,
    Rooms,
    IPDATA,
}