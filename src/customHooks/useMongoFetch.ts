// "use client"

// import React, { useEffect, useState } from "react";
// import clientPromise from "@/utils/mongo";
// import { MongoClient, ObjectId } from "mongodb";



// const useMongoFetch = (category:ObjectId,collection:string)=>{
//     const [data,setData] = useState<any>(null); // set data state
//     const [error,setError] = useState(false); // set error state
//     const [loading,setLoading] = useState(false); // set loading state





//     useEffect(()=>{
//         const fetchData = async ()=>{
//             try{
//                 setLoading(true);

//                 const client:MongoClient = await clientPromise;

//                 const db = client.db("topicsdb");

//                 const Collection = db.collection(collection);

//                 let response = await Collection.find({
//                     _id:category
//                 }).toArray();

//                 setData(response);
//                 setLoading(false);
//                 setError(false);
//             }catch(error){
//                 setData(null);
//                 setError(true);
//                 setLoading(false);
//             }
//         }

//         fetchData();
        


//     },[category]); // runs on initial render(initial mount) and dependency array change



//     return {
//         data,
//         loading,
//         error
//     };

// }



// export default useMongoFetch;