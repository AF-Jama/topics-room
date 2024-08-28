import { createServer } from "http";
import { Server } from "socket.io";
import { MongoClient } from "mongodb";
import { room, categories, messages } from "../utils/utils.js";
import dotenv from 'dotenv';

dotenv.config({path:'../.env'});

const uri = process.env.MONGODB_URI;
const options = { fullDocument: "updateLookup" };
const pipeline = [];

const messageChangeStream = messages.watch(pipeline,options);

const httpServer = createServer();
const io = new Server(httpServer, { cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }});

const EVENTS = {
    CHANGE:"change",
    DELETE:'delete'
}

io.on("connection", (socket) => {
    console.log(`Connected ${socket.id}`);

    console.log("CONNECTED");

    socket.emit("hello","world");

    socket.on("disconnect",()=>console.log(`Socket ${socket.id} disconnected`));

    socket.on("typing",(data)=>{
        console.log("TYPING");
        io.emit("display",data);
    }) // emits data when typing event occurs

    messageChangeStream.on("change", next => { // triggered on message collection change ie: INSERT
        // Print any change event
        switch (next.operationType) {
            case "insert":
                console.log(`INSERT ${socket.id}`);
                io.to(socket.id).emit("change",next.fullDocument);
                break;

            case 'delete':
                break;
        
            default:
                break;
        }
    });

});



httpServer.listen(5000);