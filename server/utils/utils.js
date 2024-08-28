import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config({path:'../.env'});


const uri = process.env.MONGODB_URI; // mongodb URI

const client = new MongoClient(uri);


const db = client.db("topicsdb");


const categories = db.collection("categories");
const messages = db.collection("messages");
const room = db.collection("rooms");



export {
    categories,
    room,
    messages
}