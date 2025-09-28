import "./config/dotenvConfig.ts";
import connectDB from "./db/dbConnect.ts";
// import express from "express";
import cors from "cors";
import SocketService from "./services/socket.ts";
import http from "http"

// const app = express();
// app.use(cors());
// app.use(express.json());

const PORT = process.env.PORT || 5000;

async function init() {

    const socketService = new SocketService()
    const server = http.createServer();

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