import React, { useState } from "react";
import Input from "./subcomponents/input";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import stylelogin from "../css/login.module.css"
import { Link } from "@mui/material";

const yupSchema = yup.object({
  filedinput: yup.string().required("Email or Mobile is Required"),
  password: yup.string().required("Passwoord is Mandatory")
});

export default function Login() {
  let navigateto = useNavigate();
  let [message,setmessage]=useState(false)
  let {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(yupSchema) });

  // const [logpage, setlogpage] = useState({email:"",filedinput:"" ,password:""});

  // let logsubmit = ({ target: { value, name } }) => {

  //   if(name==="email"){
  //     setlogpage({email:"",password:""})
  //   }else if(name==="filedinput"){
  //     setlogpage({filedinput:"",password:""})
  //   }
  //   setlogpage({ ...logpage, [name]: value });
  // };

  let Loginsubmit = async ({filedinput,password}) => {
   
    try {
      let loginin = await axios.post(
        "http://localhost:9000/api/info/login",
        {filedinput,password}
      );
      console.log(loginin);
      console.log(loginin.fullname);
          if (loginin.status===200){
            localStorage.setItem("token","Bearer"+" "+loginin.data.token)
            localStorage.setItem("fullname",loginin.data.fullname)
            console.log(localStorage.token);
            // setlogpage({ email: "", password: "" })
            setmessage(true)
            setTimeout(()=>{
              setmessage(false)
              navigateto("/");
            },2000)

            
          }

      // console.log(loginin);
    } catch (err) {
      console.log("catch");
      console.log(err.config.data);
      let loginin=await axios.post("http://localhost:9000/api/info/login",err.config.data)
    }

    
  };
let otplogin=()=>{

  navigateto("/loginwithotp")

}

let token= localStorage.getItem("token")

  return (
    <>
     <div style={{height:"100px",display:"flex",justifyContent:"center",alignItems:"center",color:"Green"}}>{!message?"":<h1>Logedin successfully</h1>}
            </div> 
    <div className={stylelogin.main}>
      <h1>Login</h1>
      {/* <form action="" className={stylelogin.Form} onSubmit={Loginsubmit}> */}
      <form action="" className={stylelogin.Form} onSubmit={handleSubmit(Loginsubmit)}>
        <Input 
          type={"text"}
          placeholder={"Enter Email or Mobile"}
          // onChange={logsubmit}
          name= {"filedinput"}
          // value={logpage.filedinput}
          register={{ ...register("filedinput") }}
          errorMessage={errors.filedinput?.message}
        />
        <Input
          type={"password"}
          placeholder={"Enter your password"}
          // onChange={logsubmit}
          name="password"
          // value={logpage.password}
          register={{ ...register("password") }}
          errorMessage={errors.password?.message}
        />

        <button type="submit">Login</button>
      </form>

      <div className={stylelogin.otp} onClick={otplogin} ><h3>OTP Login</h3></div>
    </div>
    </>
  );
}


