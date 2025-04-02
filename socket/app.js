import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: ["http://localhost:5173", "https://urban-estate-psi.vercel.app"], // ✅ Allow both localhost and deployed frontend
        methods: ["GET", "POST"], 
        credentials: true, // ✅ Allow cookies & authentication
    }
});

let onlineUsers = [];

// ✅ Add user to the online list
const addUser = (userId, socketId) => {
    const userExists = onlineUsers.find((user) => user.userId === userId);
    if (!userExists) {
        onlineUsers.push({ userId, socketId });
    }
};

// ✅ Remove user from the online list
const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

// ✅ Get user by userId
const getUser = (userId) => {
    return onlineUsers.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    console.log(`🟢 User connected: ${socket.id}`);

    socket.on("newUser", (userId) => {
        addUser(userId, socket.id);
        console.log("Online Users:", onlineUsers);
    });

    socket.on("sendMessage", ({ receiverId, data }) => {
        const receiver = getUser(receiverId);
        if (receiver) {
            io.to(receiver.socketId).emit("getMessage", data);
            console.log(`📨 Message sent to ${receiverId}`);
        } else {
            console.log(`❌ Receiver with ID ${receiverId} not found.`);
        }
    });

    socket.on("disconnect", () => {
        console.log(`🔴 User disconnected: ${socket.id}`);
        removeUser(socket.id);
    });
});

// ✅ Dynamic port for flexibility
const PORT = process.env.PORT || 4000;
io.listen(PORT, () => {
    console.log(`🚀 Socket.IO server running on port ${PORT}`);
});
