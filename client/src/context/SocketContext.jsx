import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        
        const socketServerURL =
            import.meta.env.MODE === "development"
                ? "http://localhost:4000" 
                : "https://urban-estate-project-socket.onrender.com"; 

        const newSocket = io(socketServerURL, {
            withCredentials: true,
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect(); 
        };
    }, []);

    useEffect(() => {
        if (currentUser && socket) {
            socket.emit("newUser", currentUser.id);
        }
    }, [currentUser, socket]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
