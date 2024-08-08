import { MongoClient } from 'mongodb';


const mongoClient = new MongoClient(process.env.MONGODB_URL as string,{});



export default mongoClient;
