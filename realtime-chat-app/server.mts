import { Server } from "socket.io";
import next from "next";
import {createServer} from "node:http";

const dev = process.env.NODE_ENV !== "production";  
const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handle);
    const io = new Server(httpServer);
    io.on("connection", (socket) => {
        console.log(`New client connected : ${socket.id}`);

        socket.on("joinRoom", ({roomId, username}) => {
            socket.join(roomId);
            console.log(`${username} has joined room: ${roomId}`);
            io.to(roomId).emit("userJoined", {username, message: `${username} has joined the room.`});
        });

        socket.on("message", ({roomId, sender, message}) => {
            console.log(`Message from ${sender} in room ${roomId}: ${message}`);
            io.to(roomId).emit("message", {sender, message});
        });

        socket.on("disconnect", () => {
            console.log(`Client disconnected : ${socket.id}`);
        });
    });

    httpServer.listen(port, () => {
        console.log(`Server is running on http://${hostname}:${port}`);
    });  
});
