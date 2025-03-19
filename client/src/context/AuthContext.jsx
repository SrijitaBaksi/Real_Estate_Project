import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const [currentUser,setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    ) //user information is there or not in local storage 

    const updateUser=(data)=>{
        setCurrentUser(data)
    }

    useEffect(()=>{
        localStorage.setItem('user',JSON.stringify(currentUser))
    },[currentUser])


    return (
        <AuthContext.Provider value={{currentUser, updateUser}}>
         {children}
        </AuthContext.Provider> 
        )//any infor passed here is accessible in entire page 
}