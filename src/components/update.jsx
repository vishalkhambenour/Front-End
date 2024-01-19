
import React, { useEffect, useState } from "react";
import Input from "./subcomponents/input";
import axios from "axios";
import Addstyle from "../css/addtask.module.css"
import { useNavigate, useParams } from "react-router-dom";



export default function Update(){

    let [add,setadd]=useState({productname:"",price:"",color:""})
    let [message,setmessage]=useState(false)


    let addchange=({target:{value,name}})=>{
        setadd({...add,[name]:value})
    }
    let {_id}=useParams()

    let navigateto=useNavigate()
    let updatetasks=async()=>{
        try{
           
            let {data}= await axios.get(`http://localhost:9000/api/info/alltasks/viewtask/${_id}`)
           
            // console.log("try");
            setadd(data.data)
        }catch(err){
            console.log("catch");
            console.log(err);
        }
    }
    useEffect(()=>{
        updatetasks()
    },[])


        let addsubmit=async(e)=>{
            try{
                e.preventDefault();
                let addsubmittask=await axios.put(`http://localhost:9000/api/info/alltasks/updatetask/${_id}`,add)
                // console.log(addsubmittask);
                setmessage(true)
                setTimeout(()=>{
                    setmessage(false)
                    navigateto('/alltasks')
                },2000)
                

            }
            catch(err){
                console.log(err);
            }
        }





    return (
        <div >
           <div style={{height:"100px",display:"flex",justifyContent:"center",alignItems:"center",color:"Green"}}>{!message?"":<h1>Updated successfully</h1>}
            </div> 
                 <div className={Addstyle.main}><form className={Addstyle.Form} action="" onSubmit={addsubmit}>
            <Input  type="text" onChange={addchange} value={add.productname} name="productname" placeholder="Enter product name" />
            <Input  type="text" onChange={addchange} value={add.price} name="price" placeholder="Enter product price" />
            <Input  type="text" onChange={addchange} value={add.color} name="color" placeholder="Enter product color" />

            <button type="submit">Updatetask</button>
        </form></div>
        
        </div>
    )
}