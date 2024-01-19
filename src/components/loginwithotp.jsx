
import styleinputs from "../css/loginwithotp.module.css"




import axios from "axios";
import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginWithOTP() {
  let [email, setemail] = useState("");
  let [message, setmessage] = useState(false);
  let [show, setshow] = useState(false);
  let [verifynow, setverifynow] = useState(false);
  const[code,setcode]=useState(new Array(6).fill(""))

  let [count,setcount]=useState()
  let [timer,setTimer]=useState(true)


  useEffect(()=>{
    
    if(count >0){ 
      let p = setInterval(() => {
        setcount((previous)=> previous-1)
        // console.log(count);
       
      }, 1000);
     
      return ()=>{
        clearInterval(p)

    }}
      else if(count===0){
       
        setTimer(!timer)
      }

  },[count])

  let navigateto = useNavigate();

  // ! EMAIL
  let changeemail = ({ target: { name, value } }) => {
    setemail({ ...email, [name]: value });
  };

  let sendotp = async () => {
    try {
      setcount(60)
      // console.log("hii");
      // console.log(email);
      let {data} = await axios.post(
        "http://localhost:9000/api/info/validatemail",
        email
      );
      console.log(data.message);
      // console.log("Email sent");
      setmessage(true);
      setshow(true);
      setTimeout(() => {
        setmessage(false);
      }, 2000);
      // console.log("bye");
    } catch (err) {
      console.log("catch");
      console.log(err);
    }
  };
  
  // ! OTP
    let otpchanges=(e,index)=>{
    if(isNaN(e.value)) return false;

    setcode([...code.map((d,ind)=> (ind===index? e.value : d ) )]);
    // focusing
    if( e.nextSibling){
      e.nextSibling.focus()
    }
   
  }


  let verifyotp = async () => {
    try {
      let sendadta={...email,otp:code.join("")}
      // console.log(sendadta);
   
      // console.log("try");
      let { data } = await axios.post(
        "http://localhost:9000/api/info/verifyotp",
        sendadta
      );
      console.log(data.message);
      localStorage.setItem("fullname",data.fullname)
      localStorage.setItem("token","Bearer"+" "+data.token)
      setemail("");
      setverifynow(true)
      setTimeout(() => {
        setshow(false);
        setverifynow(false)
        setTimer(!timer)
        navigateto("/")
      }, 2000);
    } catch (err) {
      console.log("caught");
      console.log(err);
      console.log(err.config);
    }
  };
  // !!!!!!!!!!!

  let Resendotp=async()=>{
    console.log(email);
    try{
    let mail = await axios.post(
      "http://localhost:9000/api/info/validatemail",
      email
    )
setTimer(!timer)
setcount(60)

    }
    catch(err){
      console.log("catch");
      console.log(err);
    }

  }

  return (
    <div className={styleinputs.classmain} >
      <h5 style={{height:"10px",color:"chartreuse"}} >{!message ? "" : "MAIL SENT SUCCESSFULY"}</h5>
      <h5 style={{height:"10px",color:"chartreuse"}}>{!verifynow?"":"OTP VERIFIED"}</h5>
      

      <div>
        {!show ? (
          <div >
           <div className={styleinputs.mainemail}>
            <h1 style={{color:"whitesmoke"}} > LOGIN WITH OTP</h1>
            {" "}
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              onChange={changeemail}
            />
            <button onClick={sendotp}>SEND</button>
           </div>
          </div>
        ) : ( 
        <div className={styleinputs.mainverify}>
          <h1 style={{color:"dimgrey"}}>ENTER OTP</h1>

             <div>
              {
                code.map((data,index)=>{
                  return <input className={styleinputs.mapinput} type="text" key={index} name="otp" maxLength="1" value={data} onChange={(e)=>{otpchanges(e.target,index)}} onFocus={(e)=>e.target.select()} />
                })
              }
              </div>
                    { timer  ?<p  style={{color:"red"}}>{`OTP EXPIRES IN ${count} seconds `}</p>:<p style={{color:"red"}}>OTP Expired</p>}
              <div>
                <button onClick={(e)=>setcode([...code.map(value=>"")])} className={styleinputs.Clearbtn} >clear</button>
                {timer? <button onClick={verifyotp} className={styleinputs.verifybtn} >VERIFY OTP</button>:
                 <button onClick={Resendotp} className={styleinputs.verifybtn}>RESEND OTP</button>}

              </div> 
        </div>
        )}
      </div>

    </div>
  );
}





