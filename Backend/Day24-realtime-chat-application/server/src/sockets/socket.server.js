import { Server } from "socket.io";
import { verifyToken } from "../utils/jwt.js";

export default function (httpServer) {
  const io = new Server(httpServer);

  // middleware to check if the user is authorized to even chat
  io.use((socket, next) => {
    const token = socket.handshake.headers?.authorization?.split(" ")[1];

    if (!token) {
      return next(new Error("Authorization Error"));
    }

    try {
      const decoded = verifyToken(token, "access");

      socket.user = decoded;
      next();
    } catch (err) {
      return next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    socket.on("message",(msg)=>{
      socket.broadcast.emit("message",{...msg, email:socket.user.email})
    })
  });
}
