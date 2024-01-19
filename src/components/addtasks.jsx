import React, { useState } from "react";
import Input from "./subcomponents/input";
import axios from "axios";
import Addstyle from "../css/addtask.module.css"



export default function Addtask(){

    let [add,setadd]=useState({productname:"",price:"",color:""})
    let [message,setmessage]=useState(false)


    let addchange=({target:{value,name}})=>{
        setadd({...add,[name]:value})
    }
    
    let addsubmit=async(e)=>{
        e.preventDefault()
        let token= localStorage.getItem("token")
        try{
           
            let addProducts= await axios.post("http://localhost:9000/api/info/addtask",add,{headers:{Authorization:token}})
            setmessage(true)
            setTimeout(() => {
                setmessage(false)
                setadd({productname:"",price:"",color:""})
            }, 2000);
            // console.log("try");

        }catch(err){
            // console.log("catch");
            console.log(err);
            // console.log(err.config.data);
            // let addProducts= await axios.post("http://localhost:9000/api/info/addtask",err.config.data)
        }


    }
    let token=localStorage.getItem("token")

    return (
        <div >
            <div style={{height:"100px",display:"flex",justifyContent:"center",alignItems:"center",color:"Green"}}>{!message?"":<h1>Added successfully</h1>}
            </div>

                {token?  <div className={Addstyle.main}><form className={Addstyle.Form} action="" onSubmit={addsubmit}>
            <Input  type="text" onChange={addchange} value={add.productname} name="productname" placeholder="Enter product name" />
            <Input  type="text" onChange={addchange} value={add.price} name="price" placeholder="Enter product price" />
            <Input  type="text" onChange={addchange} value={add.color} name="color" placeholder="Enter product color" />

            <button type="submit">Addtask</button>
        </form></div>:<h1 style={{margin:"20px "}} >Login is Mandatory</h1>}
        
        </div>
    )
}