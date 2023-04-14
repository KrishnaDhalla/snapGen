import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../Assets/plate.png"
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '../firebase-config'
import { signOut } from 'firebase/auth'
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
// import { RiMoonFill, RiSunLine } from "react-icons/ri"
const Navbar = () => {
  const [user]=useAuthState(auth)
  const navigator=useNavigate()
  const logOut=async()=>{
    await signOut(auth)
    navigator("/")
  }
  const navigateToHome=()=>{
    navigator("/")
  }
  
  return (
    <header className=' flex items-center justify-between md:px-8 md:py-4 px-5 py-4'>
        <div className='flex items-center md:gap-5 gap-2 '>
          <img onClick={navigateToHome} src={logo} alt="logo" className='md:w-12 w-9  cursor-pointer'/>
        <h3 className='font-semibold text-xl cursor-pointer' onClick={navigateToHome}>snapGen</h3>
        </div>
        <div className='flex items-center md:gap-5 gap-2'>
            <button className='  hover:bg-black hover:text-white font-medium md:py-2 md:px-4 py-1 px-2  rounded'><Link to={"/generate"}>Generate</Link></button>
            {user? <div className='md:px-10  no-underline text-gray-500'>
              <div className='flex'>
                <Avatar className="md:mr-10 mr-5" src={user.photoURL} alt={user.displayName} />
                <button className='bg-transparent text-gray-700 border-none text-base' onClick={logOut}><LogoutIcon/></button>
              </div>
              </div>
            :<Link to={"/login"}>Login</Link>
            }
            
        </div>
    </header>
  )
}

export default Navbar