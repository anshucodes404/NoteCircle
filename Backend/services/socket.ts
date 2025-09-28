import { Server } from "socket.io"

class SocketService {
    private _io: Server

    constructor() {
        console.log("Initializing SocketService...")
        this._io = new Server()
    }

    public initListeners() {
        const io = this.io
        console.log("Intializing socket listeners...")
        io.on("connection", (socket) => {
            console.log("New socket connected", socket.id)

            socket.on("message", ({ message }: { message: string }) => {
                console.log("Message received: ", message)
                io.emit("message", message)
            })
        })
    }

    get io() {
        return this._io
    }
}


export default SocketService;