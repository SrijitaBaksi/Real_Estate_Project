import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const [currentUser,setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    ) //user information is there or not in local storage 

    const loginUser = (user, token) => {
        setCurrentUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);  // Store token
    };

    // Function to log out user
    const logoutUser = () => {
        setCurrentUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    useEffect(()=>{
        localStorage.setItem('user',JSON.stringify(currentUser))
    },[currentUser])


    return (
        <AuthContext.Provider value={{currentUser, loginUser,logoutUser}}>
         {children}
        </AuthContext.Provider> 
        )//any infor passed here is accessible in entire page 
}