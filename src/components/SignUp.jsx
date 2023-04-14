import React, { useState } from 'react'
import google from "../Assets/google.svg";
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase-config';
const SignUp = ({selectedTab,setSelectedTab}) => {
    const [registerEmail,setRegisterEmail]=useState("")
    const [registerPassWord,setRegisterPassword]=useState("")
    const [registerCpassword,setRegisterCpassword]=useState("")
    const navigate=useNavigate()
    const handleSignUpSubmit=async()=>{
      if(registerPassWord!==registerCpassword){
        console.warn("password do not match")
      }
      try {
        await createUserWithEmailAndPassword(auth,registerEmail,registerPassWord)
        handleTabChange();
        navigate("/login")
        
      } catch (error) {
        console.warn(error)
      }
    }
    const signInWithGoogle=async()=>{
      try{
        await signInWithPopup(auth,googleProvider)
        navigate("/")
      }catch(error){
        console.log(error)
      }
    }
    const handleTabChange=()=>{
      setSelectedTab(!selectedTab)
    }
    
    return (
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
              onChange={(e)=>setRegisterEmail(e.target.value)}
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Password</span>
            <input
              type="password"
              label="Enter Password"
              name="pass"
              id="pass"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              onChange={(e)=>setRegisterPassword(e.target.value)}
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Confirm Password</span>
            <input
              type="password"
              label="Enter Confirm Password"
              name="pass"
              id="cpass"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              onChange={(e)=>setRegisterCpassword(e.target.value)}
            />
          </div>
          <button className="w-full bg-black text-white p-2 rounded-lg mb-6  hover:border hover:border-gray-300" onClick={handleSignUpSubmit}>
            Sign Up
          </button>
          <button className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white" onClick={signInWithGoogle}>
            <img src={google} alt="img" className="w-6 h-6 inline mr-2" />
            Sign in with Google
          </button>
          <div className="text-center text-gray-400">
            Got an account?
            <span className="font-bold text-black cursor-pointer" onClick={handleTabChange} >
              {" "}
              Login here
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp