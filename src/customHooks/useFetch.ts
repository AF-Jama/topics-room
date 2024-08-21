"use client"

import React, { useEffect, useState } from "react";



const useFetch = (URI:string)=>{
    const [data,setData] = useState<any>(null); // set data state
    const [error,setError] = useState(false); // set error state
    const [loading,setLoading] = useState(false); // set loading state





    useEffect(()=>{
        const fetchData = async ()=>{
            try{

                setLoading(true);

                let response = await fetch(URI,{

                });

                if(!response.ok) throw new Error("Could not fetch data...");

                response = await response.json();

                console.log(response);

                setData(response);
                setLoading(false);
                setError(false);
            }catch(error){
                setData(null);
                setError(true);
                setLoading(false);
            }
        }

        fetchData();
        


    },[URI]); // runs on initial render(initial mount) and dependency array change



    return {
        data,
        loading,
        error
    };

}



export default useFetch;