import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
import prisma from "./lib/prisma.js";

const port = process.env.PORT || 8800;
const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://urban-estate-psi.vercel.app"
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // 
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());


app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});


app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);


async function startServer() {
    try {
        await prisma.$connect();
        console.log("✅ Database connected successfully"); 

        app.listen(port, () => {
            console.log(`🚀 Server running on port ${port}`);
        });

    } catch (err) {
        console.error("❌ Failed to connect to the database", err); 
        process.exit(1); 
    }
}

startServer();
