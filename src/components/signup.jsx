import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./subcomponents/input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import signupstyle from "../css/signup.module.css";
import axios from "axios";

let yupSchema = yup.object({
  firstname: yup.string().required("firstname is Mandatory").min(3),
  lastname: yup.string().required("lastname is Mandatory"),
  email: yup
    .string()
    .required("email is Mandatory")
    .email("email is not valid"),
  mobile: yup
    .string()
    .max(10)
    .required("mobile is Mandatory")
    .min(10)
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Must be a number"),
  Password: yup.string().required("Password is Mandatory").min(8),
  password: yup
    .string()
    .required("ConfirmPassword is Mandatory")
    .oneOf([yup.ref("Password")], "Confirm Password must match the Password "),
  gender: yup.string().required("gender is mandatory"),
});

export default function Signup() {
  // const [signup,setSignup]= useState({firstname:"",lastname:"",email:"",mobile:"",password:"",gender:"",skills:""})
  let [message, setmessage] = useState(false);

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(yupSchema) });

  let navigateto = useNavigate();

  // let inputchange=({target:{value,name}})=>{
  //   // console.log(e.target);
  //   // setSignup({...signup,[name]:value})
  // }

  let submitdta = async (e) => {
    console.log(e);

    let { firstname, lastname, email, mobile, password, gender, skills } = e;
    // e.preventDefault()

    try {
      let axiosSignup = await axios.post(
        "http://localhost:9000/api/info/signup",
        { firstname, lastname, email, mobile, password, gender, skills }
      );
      console.log("try");
      setmessage(true);
      setTimeout(() => {
        setmessage(false);
        navigateto("/login");
      }, 2000);
    } catch (err) {
      console.log("catch");
      console.log(err);
      // console.log(err.config.data);
      // let axiosSignup= await axios.post("http://localhost:9000/api/info/signup",err.config.data)
    }
  };
  return (
    <>
      {" "}
      <div
        style={{
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "Green",
        }}
      >
        {!message ? "" : <h1>Signedin successfully</h1>}
      </div>
      <div className={signupstyle.main}>
        <h1>Signup</h1>
        {/* <form action="" onSubmit={submitdta} className={signupstyle.Form}> */}
        <form
          action=""
          onSubmit={handleSubmit(submitdta)}
          className={signupstyle.Form}
        >
          <div className={signupstyle.samediv}>
            <Input
              // onChange={inputchange}
              type="text"
              name="firstname"
              placeholder="FIRST NAME"
              // value={signup.firstname} {required:{value:{firstname:signup.firstname}}}
              register={{ ...register("firstname") }}
              errorMessage={errors.firstname?.message}
            />
            <Input
              // onChange={inputchange}
              type="text"
              name="lastname"
              placeholder="LAST NAME"
              //  value={signup.lastname} ,{required:{value:{lastname:signup.lastname}}}
              register={{ ...register("lastname") }}
              errorMessage={errors.lastname?.message}
            />
          </div>
          <div className={signupstyle.samediv}>
            <Input
              // onChange={inputchange}
              type="email"
              name="email"
              placeholder="email"
              // value={signup.email} ,{required:{value:{email:signup.email}}}
              register={{ ...register("email") }}
              errorMessage={errors.email?.message}
            />
            <Input
              // onChange={inputchange}
              type="tel"
              name="mobile"
              placeholder="PHONE NUMBER"
              // value={signup.mobile} ,{required:{value:{mobile:signup.mobile}}}
              register={{ ...register("mobile") }}
              errorMessage={errors.mobile?.message}
            />
          </div>
          <div className={signupstyle.samediv}>
            <Input
              // onChange={inputchange}
              type="password"
              name="pass"
              placeholder="PASSWORD"
              // value={signup.pass} ,{required:{value:{pass:signup.pass}}}
              register={{ ...register("Password") }}
              errorMessage={errors.Password?.message}
            />
            <Input
              // onChange={inputchange}
              type="password"
              name="password"
              placeholder="CONFIRM PASSWORD"
              // value={signup.password} ,{required:{value:{password:signup.password}}}
              register={{ ...register("password") }}
              errorMessage={errors.password?.message}
            />
          </div>
          <div className={signupstyle.samediv}>
            <h1>Gender</h1>
            <Input
              type="radio"
              name="gender"
              register={{ ...register("gender") }}
              value="Male"
              id="male"
            />
            <label htmlFor="male">Male</label>
            <Input
              type="radio"
              name="gender"
              register={{ ...register("gender") }}
              value="Female"
              id="female"
            />
            <label htmlFor="female">Female</label>
            <Input
              type="radio"
              name="gender"
              register={{ ...register("gender") }}
              value="Others"
              id="other"
            />
            <label htmlFor="other">Others</label>
          </div>
          <div className={signupstyle.samediv}>
            <h1>Skills</h1>
            <Input
              type="checkbox"
              name="skills"
              register={{ ...register("skills") }}
              value="Java"
              id="java"
            />
            <label htmlFor="java">Java</label>
            <Input
              type="checkbox"
              name="skills"
              register={{ ...register("skills") }}
              value="Javascript"
              id="Javascript"
            />
            <label htmlFor="Javascript">Javascript</label>
            <Input
              type="checkbox"
              name="skills"
              register={{ ...register("skills") }}
              value="React"
              id="React"
            />
            <label htmlFor="React">React</label>
            <Input
              type="checkbox"
              name="skills"
              register={{ ...register("skills") }}
              value="MongoDb"
              id="MongoDb"
            />
            <label htmlFor="MongoDb">MongoDb</label>
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
}
