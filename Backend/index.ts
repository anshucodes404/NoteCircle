import "./config/dotenvConfig.ts";
import express from "express";
import cors from "cors";
import SocketService from "./services/socket.ts";
import http from "http"
import "./db/dbConnect.ts"
import cookieParser from "cookie-parser"


const app = express();
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));
app.use(express.json());
app.use(cookieParser())

const PORT = process.env.PORT || 5000;

async function init() {

    const socketService = new SocketService()
    const server = http.createServer(app);

    socketService.io.attach(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        }
    })
    
    server.listen(PORT, () => {
        console.log("Server is running on port: " + PORT)
    })
    socketService.initListeners()
}

init();


import userRouter from "./routes/user.route.ts";

app.use("/api/v1/user", userRouter)