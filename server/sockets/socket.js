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
    origin: process.env.HOST||"*",
    methods: ["GET", "POST"]
  }});

const EVENTS = {
    CHANGE:"change",
    DELETE:'delete'
}

io.on("connection", (socket) => { // callback with socket arg that defines unique connection between the client and server
    console.log(`Connected ${socket.id}`);

    console.log("CONNECTED");

    socket.emit("hello","world");

    socket.on("disconnect",()=>console.log(`Socket ${socket.id} disconnected`));

    socket.on("typing",(data)=>{
        console.log("TYPING");
        io.except(socket.id).emit("display",data); // emit data to all connected client sockets except for source client
    }) // emits data when typing event occurs

    socket.on("doneTyping",(data)=>{
        io.except(socket.id).emit("done",data);
    })

    messageChangeStream.on("change", next => { // triggered on message collection change ie: INSERT
        // Print any change event
        switch (next.operationType) {
            case "insert":
                console.log(`INSERT ${socket.id}`);
                // io.to(socket.id).emit("change",next.fullDocument);
                socket.emit("change",next.fullDocument);
                break;

            case 'delete':
                break;
        
            default:
                break;
        }
    });

});



httpServer.listen(process.env.PORT);