import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
import prisma from "./lib/prisma.js"; // Import Prisma Client

const port = 8800;
const app = express();

// CORS configuration for your frontend
app.use(cors({
    origin: 'http://localhost:5173',  // Your frontend's origin
    credentials: true
}));

// Handle preflight requests for all routes
app.options('*', cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// No-store cache header for all responses
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);


// Connect to the database and log connection status
async function startServer() {
    try {
        await prisma.$connect();
        console.log("Database connected successfully"); // Log successful connection

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

    } catch (err) {
        console.error("Failed to connect to the database", err); // Log failure if connection fails
        process.exit(1); // Exit process if database connection fails
    }
}

// Start the server

startServer();
