import axios from "axios";
import React, { useEffect, useState } from "react";
import  Table  from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css"
import { useNavigate } from "react-router-dom";



export default function Alltasks(){


    let [all,setalltask]=useState([])
    let [message,setmessage]=useState(false)
    let token = localStorage.getItem("token")
    let alltasks=async()=>{
        // console.log(token);
        if(token)
        {
        let {data}= await axios.get("http://localhost:9000/api/info/alltasks",{headers:{Authorization:token}})
                // console.log(data);
        setalltask(data.AllTasks);
        }

    }
    useEffect(()=>{
        alltasks()
        // console.log(all);
    },[])
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

let navigateto=useNavigate()
    let Viewtask=(_id)=>{
        navigateto(`/alltasks/viewtask/${_id}`)        
    }
    let Updatetask=(_id)=>{
        navigateto(`/alltasks/updatetask/${_id}`,{
            state:{
                data:"check"
            }
        })   
    }
    let Deletetask=async(_id)=>{
        try{
                await axios.delete(`http://localhost:9000/api/info/alltasks/deletetask/${_id}`)
                setmessage(true)
                setTimeout(()=>{
                    setmessage(false)
                   
                },2000)
                alltasks()
        
        }
        catch(err){
            console.log(err);

        }

    }
   
    return (
        <>
        <div style={{height:"100px",display:"flex",justifyContent:"center",alignItems:"center",color:"Green"}}>{!message?"":<h1>Deleted successfully</h1>}
            </div> 
        {token?<div>
        <h1>Alltasks</h1>
        <Table >
                    <thead>
                     <tr>  
                        <th>ProductName</th>
                        <th>Price</th>
                        <th>Color</th>
                        <th>View</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    
        {
            all.map(({color,price,productname,_id})=>{
                return <tbody key={_id}>
                <tr>
                    <td>{productname}</td>
                    <td>{price}</td>
                    <td>{color}</td>
                    <td><button onClick={()=>{Viewtask(_id)}}>View</button></td>
                    <td><button onClick={()=>{Updatetask(_id)}}>Update</button></td>
                    <td><button onClick={()=>{Deletetask(_id)}}>Delete</button></td>
                </tr>
            </tbody>
               


            })
        }
                </Table>

        
        </div>:<h1 style={{margin:"20px "}}>For Alltask Login is Mandatory</h1>}
        
        
        </>
    )
}