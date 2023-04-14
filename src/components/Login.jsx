import React, { useState } from "react";
import {signInWithEmailAndPassword} from 'firebase/auth'
import { auth} from "../firebase-config";
import { useNavigate } from "react-router-dom";
import SignUp from "./SignUp";

const Login = () => {
  const [selectedTab, setSelectedTab] = useState(false);
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const navigate=useNavigate()
  const handleTabChange=()=>{
    setSelectedTab(!selectedTab)
  }
  const handleLoginSubmit=async()=>{
    try{
      await signInWithEmailAndPassword(auth,email,password)
      navigate("/")
    }catch(error){
      console.warn(error)
    }
    console.log(auth.currentUser.email)
  }
  
  {if(selectedTab){
    return(
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Welcome back</span>
          <span className="font-light text-gray-400 mb-5">
            Please enter your details
          </span>
          <div className="py-1">
            <span className="mb-2 text-md">Email</span>
            <input
               type="email"
               label="Enter Email"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Password</span>
            <input
              type="password"
              name="pass"
              id="pass"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <button className="w-full bg-black text-white p-2 rounded-lg mb-6   hover:border hover:border-gray-300" onClick={handleLoginSubmit}>
            Sign in
          </button>
          <div className="text-center text-gray-400">
            Dont'have an account?
            <span className="font-bold text-black cursor-pointer" onClick={handleTabChange}>
              {" "}
              Sign up for free
            </span>
          </div>
        </div>
      </div>
    </div>
    )
  } else{
    return(
      <SignUp
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}/>
    )
  }}
};

export default Login;
