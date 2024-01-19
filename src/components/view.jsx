import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function View(){
    let [task,settask]=useState({})
    let {_id}=useParams()

    let gettask=async()=>{

        try
        {
            let {data}=await axios.get(`http://localhost:9000/api/info/alltasks/viewtask/${_id}`)
            settask(data.data)
            // console.log("try");
            // console.log(data);

        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        gettask()
    },[])


    return(
        <div>
            <ul>
                <li>Prodct Name:{task.productname}</li>
                <li>Price:{task.price}</li>
                <li>Color:{task.color}</li>
            </ul>
            
        </div>
    )
}