import {Server} from "socket.io"


const io = new Server({
    cors: {
        origin: "https://urban-estate-n4pv3vuv9-srijitabaksis-projects.vercel.app/", // Vercel frontend URL
    }
});

let onlineUser=[]

const addUser =(userId,socketId)=>{
    const userExists=onlineUser.find((user)=>user.userId===userId)
    if(!userExists){
        onlineUser.push({userId,socketId})
    }
}

const removeUser = (socketId)=>{
    onlineUser=onlineUser.filter((user)=>user.socketId!==socketId)
};

const getUser=(userId)=>{
    return onlineUser.find((user=>user.userId===userId))
}

io.on("connection",(socket)=>{
   socket.on("newUser",(userId)=>{
    addUser(userId,socket.id)
    console.log(onlineUser)
   })

   socket.on("sendMessage",({receiverId,data})=>{
    const receiver = getUser(receiverId)
   if(receiver){
    io.to(receiver.socketId).emit("getMessage",data)
   }else {
    console.log(`receiver with ID ${receiverId}' not found.`)
   }
   })

   socket.on("disconnect",()=>{
    removeUser(socket.id)
   })
})

io.listen("4000")