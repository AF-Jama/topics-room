import express from 'express';
import mongoose from 'mongoose';
import connectdb from './utils/utils.js';
import 'dotenv/config';



const app = express();


app.get('/',(req,res)=>{
    return res.json({
        "x":`SUCCESFULL  ${process.env.PORT}`
    })
})



// connectdb();

app.listen(process.env.PORT,()=>{
   console.log(`Listening on port ${process.env.PORT}`); 
});