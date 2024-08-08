import mongoose from 'mongoose';
import 'dotenv/config';



const DBNAME = {
    'dbName':'chatdb'
};


const connectdb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,DBNAME);
        console.log("Succesfull connected to mongo server");
    }catch(error){
        console.log("Unable to connect to mongo server")
    }
}



export default connectdb;