import React, { createContext, useState } from 'react'
const AppContext=createContext ()
const Context = ({children}) => {
    const [alert,setAlert]=useState({
        open:false,
        message:"",
        type:"success"
    })
  return (
    <AppContext.Provider value={{alert,setAlert}}>
        {children}
    </AppContext.Provider>
  )
}

export {Context,AppContext}
